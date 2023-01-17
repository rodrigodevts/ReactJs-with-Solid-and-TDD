import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { FieldValidation } from '@/validation/protocols/field-validation';

class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string, readonly valueToCompare: string) {}

  validate(value: string): Error {
    return value !== this.valueToCompare ? new InvalidFieldError() : null;
  }
}

export { CompareFieldsValidation };
