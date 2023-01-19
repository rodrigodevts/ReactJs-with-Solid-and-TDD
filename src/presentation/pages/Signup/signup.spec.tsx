import { EmailInUseError } from '@/domain/errors/email-in-use-error';
import * as Helper from '@/presentation/test/form-helper';
import { AddAccountSpy } from '@/presentation/test/mock-add-account';
import { ValidationStub } from '@/presentation/test/mock-validation';
import { faker } from '@faker-js/faker';
import { cleanup, render, RenderResult, waitFor } from '@testing-library/react';
import Signup from '.';

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSub = new ValidationStub();
  validationSub.errorMessage = params?.validationError;
  const addAccountSpy = new AddAccountSpy();

  const sut = render(
    <Signup validation={validationSub} addAccount={addAccountSpy} />
  );

  return {
    sut,
    addAccountSpy,
  };
};

const inputsValues = () => {
  const password = faker.internet.password();
  return [
    {
      name: 'name',
      value: faker.internet.userName(),
    },
    {
      name: 'email',
      value: faker.internet.email(),
    },
    {
      name: 'password',
      value: password,
    },
    {
      name: 'passwordConfirmation',
      value: password,
    },
  ];
};

describe('SignUp Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationError);
    Helper.testStatusForField(sut, 'email', validationError);
    Helper.testStatusForField(sut, 'password', validationError);
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateInputField(sut, 'name');
    Helper.testStatusForField(sut, 'name', validationError);
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

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.populateInputField(sut, 'passwordConfirmation');
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  test('Should show valid name state if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateInputField(sut, 'name');
    Helper.testStatusForField(sut, 'name');
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateInputField(sut, 'email');
    Helper.testStatusForField(sut, 'email');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateInputField(sut, 'password');
    Helper.testStatusForField(sut, 'password');
  });

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    const { sut } = makeSut();
    Helper.populateInputField(sut, 'passwordConfirmation');
    Helper.testStatusForField(sut, 'passwordConfirmation');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    Helper.populateInputField(sut, 'name');
    Helper.populateInputField(sut, 'email');
    Helper.populateInputField(sut, 'password');
    Helper.populateInputField(sut, 'passwordConfirmation');
    Helper.testButtonIsDisabled(sut, 'submit', false);
  });

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut();

    await Helper.simulateValidSubmit({
      sut,
      fieldsSubmit: inputsValues(),
    });
    Helper.testElementExists(sut, 'spinner');
  });

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut();
    const name = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await Helper.simulateValidSubmit({
      sut,
      fieldsSubmit: [
        {
          name: 'name',
          value: name,
        },
        {
          name: 'email',
          value: email,
        },
        {
          name: 'password',
          value: password,
        },
        {
          name: 'passwordConfirmation',
          value: password,
        },
      ],
    });
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  test('Should addAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut();
    await Helper.simulateValidSubmit({
      sut,
      fieldsSubmit: inputsValues(),
    });
    await Helper.simulateValidSubmit({
      sut,
      fieldsSubmit: inputsValues(),
    });

    expect(addAccountSpy.callsCount).toBe(1);
  });

  test('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, addAccountSpy } = makeSut({ validationError });
    await Helper.simulateValidSubmit({ sut, fieldsSubmit: inputsValues() });
    expect(addAccountSpy.callsCount).toBe(0);
  });

  test('Should present error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut();
    const error = new EmailInUseError();
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);
    await Helper.simulateValidSubmit({ sut, fieldsSubmit: inputsValues() });
    await waitFor(() => {
      Helper.testElementText(sut, 'main-error', error.message);
    });
    Helper.testChildCount(sut, 'error-wrap', 1);
  });
});
