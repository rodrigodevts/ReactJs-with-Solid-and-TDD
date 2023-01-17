import * as Helper from '@/presentation/test/form-helper';
import { render, RenderResult } from '@testing-library/react';
import Signup from '.';

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<Signup />);

  return {
    sut,
  };
};

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório';
    const { sut } = makeSut();
    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationError);
    Helper.testStatusForField(sut, 'email', validationError);
    Helper.testStatusForField(sut, 'password', validationError);
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});
