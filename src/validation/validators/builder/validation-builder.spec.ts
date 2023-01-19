import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation';
import { faker } from '@faker-js/faker';
import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation';
import { EmailValidation } from '../email/email-validation';
import { MinLengthValidation } from '../min-length/min-length-validation';
import { ValidationBuilder as sut } from './validation-builder';

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validations = sut.field(field).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test('Should return EmailValidation', () => {
    const field = faker.database.column();
    const validations = sut.field(field).email().build();
    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column();
    const length = faker.random.numeric();
    const validations = sut.field(field).min(Number(length)).build();
    expect(validations).toEqual([
      new MinLengthValidation(field, Number(length)),
    ]);
  });

  test('Should return CompareFieldValidation', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const validations = sut.field(field).sameAs(fieldToCompare).build();
    expect(validations).toEqual([
      new CompareFieldsValidation(field, fieldToCompare),
    ]);
  });

  test('Should return a list of validations', () => {
    const field = faker.database.column();
    const length = faker.random.numeric(5);
    const validations = sut
      .field(field)
      .required()
      .min(Number(length))
      .email()
      .sameAs(field)
      .build();
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, Number(length)),
      new EmailValidation(field),
      new CompareFieldsValidation(field, field),
    ]);
  });
});
