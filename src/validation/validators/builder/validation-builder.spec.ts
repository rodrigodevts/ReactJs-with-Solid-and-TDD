import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation';
import { ValidationBuilder as sut } from './validation-builder';

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build();
    expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
  });
});
