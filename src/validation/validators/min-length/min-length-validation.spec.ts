import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { faker } from '@faker-js/faker';
import { MinLengthValidation } from './min-length-validation';

const makeSut = (field: string, minLength: number): MinLengthValidation =>
  new MinLengthValidation(field, minLength);

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field, 5);
    const error = sut.validate({ [field]: faker.random.numeric(4) });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field, 5);
    const error = sut.validate({ [field]: faker.random.numeric(5) });
    expect(error).toBeFalsy();
  });

  test('Should return falsy if field does not exists in schema', () => {
    const sut = makeSut(faker.database.column(), 5);
    const error = sut.validate({
      [faker.database.column()]: faker.random.numeric(5),
    });
    expect(error).toBeFalsy();
  });
});
