import { faker } from '@faker-js/faker';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import 'jest-localstorage-mock';

import { ValidationStub } from '@/presentation/test/mock-validation';
import { AuthenticationSpy } from '@/presentation/test/mock-authentication';
import { InvalidCredentialsError } from '@/domain/errors';
import Login from '.';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;

  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  );

  return {
    sut,
    authenticationSpy,
  };
};

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const submitButton = sut.getByTestId('button-submit');
  fireEvent.click(submitButton);
};

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, { target: { value: password } });
};

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!');
  expect(emailStatus.textContent).toBe(validationError ? '🛑' : '✅');
};

describe('Login component', () => {
  afterEach(cleanup);
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const buttonSubmit = sut.getByTestId('button-submit') as HTMLButtonElement;
    expect(buttonSubmit.childElementCount).toBe(0);
    expect(buttonSubmit.disabled).toBe(true);
    simulateStatusForField(sut, 'email', validationError);
    simulateStatusForField(sut, 'password', validationError);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populateEmailField(sut);
    simulateStatusForField(sut, 'email', validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populatePasswordField(sut);
    simulateStatusForField(sut, 'password', validationError);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    simulateStatusForField(sut, 'email');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();

    populatePasswordField(sut);
    simulateStatusForField(sut, 'email');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    populatePasswordField(sut);

    const buttonSubmit = sut.getByTestId('button-submit') as HTMLButtonElement;
    expect(buttonSubmit.disabled).toBe(false);
  });

  test('Should show spinner on submit', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    populateEmailField(sut);
    fireEvent.submit(sut.getByTestId('login-form'));
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));
    simulateValidSubmit(sut);
    await waitFor(() => {
      const mainError = sut.getByTestId('main-error');
      expect(mainError.textContent).toBe(error.message);
    });
    const spinnerRunningInButton = sut.getByTestId('button-submit');
    expect(spinnerRunningInButton.textContent).toBe('Entrar');
  });

  test('Should add accessToken to localStorage on success', async () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    await waitFor(() => {
      sut.getByTestId('login-form');
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'react-solid@accessToken',
      authenticationSpy.account.accessToken
    );
    expect(history.index).toBe(0);
    expect(history.location.pathname).toBe('/');
  });

  test('Should go to signUp page', async () => {
    const { sut } = makeSut();
    const signup = sut.getByTestId('signup');
    fireEvent.click(signup);
    expect(history.index).toBe(1);
    expect(history.location.pathname).toBe('/signup');
  });
});
