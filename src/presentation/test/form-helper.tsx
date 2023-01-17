import { faker } from '@faker-js/faker';
import { fireEvent, RenderResult } from '@testing-library/react';

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
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!');
  expect(fieldStatus.textContent).toBe(validationError ? '🛑' : '✅');
};

const populateInputField = (
  sut: RenderResult,
  fieldName: string,
  value = faker.random.words()
) => {
  const element = sut.getByTestId(fieldName);
  fireEvent.input(element, { target: { value } });
};

export {
  testChildCount,
  testButtonIsDisabled,
  testStatusForField,
  populateInputField,
};
