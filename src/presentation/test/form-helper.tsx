import { faker } from '@faker-js/faker';
import { fireEvent, RenderResult, waitFor } from '@testing-library/react';

const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
) => {
  const element = sut.getByTestId(fieldName);
  expect(element.childElementCount).toBe(count);
};

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError: string = ''
): void => {
  const fieldWrap = sut.getByTestId(`${fieldName}-wrap`);
  const field = sut.getByTestId(fieldName);
  const fieldLabel = sut.getByTestId(`${fieldName}-label`);
  expect(fieldWrap.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid'
  );
  expect(field.title).toBe(validationError);
  expect(fieldLabel.title).toBe(validationError);
};

const populateInputField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.words()
) => {
  const element = sut.getByTestId(fieldName);
  fireEvent.input(element, { target: { value } });
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
    populateInputField(sut, field.name, field.value);
  });
  const loginForm = sut.getByTestId('login-form');
  fireEvent.submit(loginForm);
  await waitFor(() => loginForm);
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

export {
  testChildCount,
  testButtonIsDisabled,
  testStatusForField,
  populateInputField,
  simulateValidSubmit,
  testElementExists,
  testElementText,
};
