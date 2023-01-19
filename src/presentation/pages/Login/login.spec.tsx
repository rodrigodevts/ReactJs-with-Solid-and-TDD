import { faker } from '@faker-js/faker';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';

import * as Helper from '@/presentation/test/form-helper';
import { ValidationStub } from '@/presentation/test/mock-validation';
import { AuthenticationSpy } from '@/presentation/test/mock-authentication';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import Login from '.';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { SaveAccessTokenMock } from '@/presentation/test/mock-save-access-token';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();

  validationStub.errorMessage = params?.validationError;

  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock,
  };
};

describe('Login component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    const buttonSubmit = sut.getByTestId('button-submit') as HTMLButtonElement;
    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'button-submit', true);
    Helper.testStatusForField(sut, 'email', validationError);
    Helper.testStatusForField(sut, 'password', validationError);
    expect(buttonSubmit.childElementCount).toBe(0);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.populateInputField(sut, 'email');
    Helper.testStatusForField(sut, 'email', validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helper.populateInputField(sut, 'password');
    Helper.testStatusForField(sut, 'password', validationError);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();

    Helper.populateInputField(sut, 'email');
    Helper.testStatusForField(sut, 'email');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();

    Helper.populateInputField(sut, 'password');
    Helper.testStatusForField(sut, 'email');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    Helper.populateInputField(sut, 'email');
    Helper.populateInputField(sut, 'password');
    Helper.testButtonIsDisabled(sut, 'button-submit', false);
  });

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut();
    await Helper.simulateValidSubmit({
      sut,
      fieldsSubmit: [
        {
          name: 'email',
          value: faker.internet.email(),
        },
        {
          name: 'password',
          value: faker.internet.password(),
        },
      ],
    });
    Helper.testElementExists(sut, 'spinner');
  });

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await Helper.simulateValidSubmit({
      sut,
      fieldsSubmit: [
        {
          name: 'email',
          value: email,
        },
        {
          name: 'password',
          value: password,
        },
      ],
    });
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();
    const fields = [
      {
        name: 'email',
        value: faker.internet.email(),
      },
      {
        name: 'password',
        value: faker.internet.password(),
      },
    ];
    await Helper.simulateValidSubmit({
      sut,
      fieldsSubmit: fields,
    });
    await Helper.simulateValidSubmit({
      sut,
      fieldsSubmit: fields,
    });
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    Helper.populateInputField(sut, 'email');
    fireEvent.submit(sut.getByTestId('login-form'));
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));
    await Helper.simulateValidSubmit({
      sut,
      fieldsSubmit: [
        {
          name: 'email',
          value: faker.internet.email(),
        },
        {
          name: 'password',
          value: faker.internet.password(),
        },
      ],
    });
    await waitFor(() => {
      Helper.testElementText(sut, 'main-error', error.message);
    });
    Helper.testChildCount(sut, 'error-wrap', 1);
    Helper.testElementText(sut, 'button-submit', 'Entrar');
  });

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();
    await Helper.simulateValidSubmit({
      sut,
      fieldsSubmit: [
        {
          name: 'email',
          value: faker.internet.email(),
        },
        {
          name: 'password',
          value: faker.internet.password(),
        },
      ],
    });
    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.token
    );
    expect(history.index).toBe(0);
    expect(history.location.pathname).toBe('/');
  });

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut();
    const error = new InvalidCredentialsError();
    await waitFor(async () => {
      jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error);
      await Helper.simulateValidSubmit({
        sut,
        fieldsSubmit: [
          {
            name: 'email',
            value: faker.internet.email(),
          },
          {
            name: 'password',
            value: faker.internet.password(),
          },
        ],
      });
      await waitFor(() => {
        Helper.testElementText(sut, 'main-error', error.message);
      });
      Helper.testChildCount(sut, 'error-wrap', 1);
      Helper.testElementText(sut, 'button-submit', 'Entrar');
    });
  });

  test('Should go to signUp page', async () => {
    const { sut } = makeSut();
    const signup = sut.getByTestId('signup');
    fireEvent.click(signup);
    expect(history.index).toBe(1);
    expect(history.location.pathname).toBe('/signup');
  });
});
