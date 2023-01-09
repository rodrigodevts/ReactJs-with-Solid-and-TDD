import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { faker } from '@faker-js/faker';
import { MinLengthValidation } from './min-length-validation';

const makeSut = (minLength: number): MinLengthValidation =>
  new MinLengthValidation(faker.database.column(), minLength);

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut(5);
    const error = sut.validate(faker.random.numeric(4));
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if value is valid', () => {
    const sut = makeSut(5);
    const error = sut.validate(faker.random.numeric(5));
    expect(error).toBeFalsy();
  });
});
