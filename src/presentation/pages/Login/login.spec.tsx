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

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const loginForm = sut.getByTestId('login-form');
  fireEvent.submit(loginForm);
  await waitFor(() => loginForm);
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

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!');
  expect(emailStatus.textContent).toBe(validationError ? '🛑' : '✅');
};

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId('error-wrap');
  expect(errorWrap.childElementCount).toBe(count);
};

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName);
  expect(element).toBeTruthy();
};

const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const element = sut.getByTestId(fieldName);
  expect(element.textContent).toBe(text);
};

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const element = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(element.disabled).toBe(isDisabled);
};

describe('Login component', () => {
  afterEach(cleanup);
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    const buttonSubmit = sut.getByTestId('button-submit') as HTMLButtonElement;
    testErrorWrapChildCount(sut, 0);
    testButtonIsDisabled(sut, 'button-submit', true);
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
    expect(buttonSubmit.childElementCount).toBe(0);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populateEmailField(sut);
    testStatusForField(sut, 'email', validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populatePasswordField(sut);
    testStatusForField(sut, 'password', validationError);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    testStatusForField(sut, 'email');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();

    populatePasswordField(sut);
    testStatusForField(sut, 'email');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    populatePasswordField(sut);
    testButtonIsDisabled(sut, 'button-submit', false);
  });

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    testElementExists(sut, 'spinner');
  });

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);
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
    await simulateValidSubmit(sut);
    await waitFor(() => {
      testElementText(sut, 'main-error', error.message);
    });
    testErrorWrapChildCount(sut, 1);
    testElementText(sut, 'button-submit', 'Entrar');
  });

  test('Should add accessToken to localStorage on success', async () => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSubmit(sut);
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
