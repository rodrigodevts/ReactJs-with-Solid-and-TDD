import { Validation } from '@/presentation/protocols/validation';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import Login from '.';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
  errorMessage: string;
  fieldName: string;
  fieldValue: string;

  validate(fieldName: string, fieldValue: string) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);
  return {
    sut,
    validationSpy,
  };
};

describe('Login component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { sut } = makeSut();

    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const buttonSubmit = sut.getByTestId('button-submit') as HTMLButtonElement;
    expect(buttonSubmit.childElementCount).toBe(0);
    expect(buttonSubmit.disabled).toBe(true);

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🛑');
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🛑');
  });

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut();

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, {
      target: {
        value: 'any_email',
      },
    });

    expect(validationSpy.fieldName).toEqual('email');
    expect(validationSpy.fieldValue).toEqual('any_email');
  });

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: {
        value: 'any_password',
      },
    });

    expect(validationSpy.fieldName).toEqual('password');
    expect(validationSpy.fieldValue).toEqual('any_password');
  });
});