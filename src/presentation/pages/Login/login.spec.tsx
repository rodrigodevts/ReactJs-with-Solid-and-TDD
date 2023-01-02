import { render } from '@testing-library/react';
import Login from '.';

describe('Login component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login />);

    const errorWrap = getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const buttonSubmit = getByTestId('button-submit') as HTMLButtonElement;
    expect(buttonSubmit.childElementCount).toBe(0);

    expect(buttonSubmit.disabled).toBe(true);
  });
});
