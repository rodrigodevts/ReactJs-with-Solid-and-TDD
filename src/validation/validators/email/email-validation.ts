/* eslint-disable no-useless-escape */
import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { FieldValidation } from '@/validation/protocols/field-validation';

class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !value || emailRegex.test(value) ? null : new InvalidFieldError();
  }
}

export { EmailValidation };
