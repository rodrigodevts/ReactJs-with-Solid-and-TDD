import { render } from '@testing-library/react';
import Login from '.';

describe('Login component', () => {
  test('Should not render error on start', () => {
    const { getByTestId } = render(<Login />);
    const errorWrap = getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
  });
  test('Should not render spinner on start', () => {
    const { getByTestId } = render(<Login />);
    const spinnerLoading = getByTestId('spinner-loading');
    expect(spinnerLoading.childElementCount).toBe(0);
  });
});
