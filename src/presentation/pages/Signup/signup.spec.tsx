import * as Helper from '@/presentation/test/form-helper';
import { ValidationStub } from '@/presentation/test/mock-validation';
import { faker } from '@faker-js/faker';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import Signup from '.';

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSub = new ValidationStub();
  validationSub.errorMessage = params?.validationError;

  const sut = render(<Signup validation={validationSub} />);

  return {
    sut,
  };
};

type SimulateValidSubmitProps = {
  sut: RenderResult;
  fieldsSubmit: Array<{
    name: string;
    value: string;
  }>;
};

const simulateValidSubmit = async ({
  sut,
  fieldsSubmit,
}: SimulateValidSubmitProps): Promise<void> => {
  fieldsSubmit.forEach((field) => {
    Helper.populateInputField(sut, field.name, field.value);
  });
  const loginForm = sut.getByTestId('login-form');
  fireEvent.submit(loginForm);
  await waitFor(() => loginForm);
};

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName);
  expect(element).toBeTruthy();
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
    const password = faker.internet.password();

    await simulateValidSubmit({
      sut,
      fieldsSubmit: [
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
      ],
    });
    testElementExists(sut, 'spinner');
  });
});
