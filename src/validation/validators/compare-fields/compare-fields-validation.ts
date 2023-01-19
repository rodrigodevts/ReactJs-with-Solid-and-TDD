import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { FieldValidation } from '@/validation/protocols/field-validation';

class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string, readonly fieldToCompare: string) {}

  validate(input: object): Error {
    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError()
      : null;
  }
}

export { CompareFieldsValidation };
