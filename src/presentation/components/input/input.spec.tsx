import { render, RenderResult } from '@testing-library/react';
import Input from './';
import { FormContext } from '@/presentation/contexts/formContext';

const makeSut = (): RenderResult => {
  const state = {
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  };
  return render(
    <FormContext.Provider value={{ state, setState: () => {} }}>
      <Input name="field" />
    </FormContext.Provider>
  );
};

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const sut = makeSut();
    const input = sut.getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
