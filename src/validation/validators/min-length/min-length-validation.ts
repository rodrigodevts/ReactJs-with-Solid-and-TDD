import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { FieldValidation } from '@/validation/protocols/field-validation';

class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: object): Error {
    return input[this.field]?.length < this.minLength
      ? new InvalidFieldError()
      : null;
  }
}

export { MinLengthValidation };
