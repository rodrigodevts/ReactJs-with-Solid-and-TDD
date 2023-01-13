import { render } from '@testing-library/react';
import Input from './';
import { FormContext } from '@/presentation/contexts/formContext';

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const state = {
      isLoading: false,
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      mainError: '',
    };
    const { getByTestId } = render(
      <FormContext.Provider value={{ state, setState: () => {} }}>
        <Input name="field" />
      </FormContext.Provider>
    );
    const input = getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
