import { FieldValidation } from '@/validation/protocols/field-validation';
import { RequiredFieldError } from '@/validation/errors/required-field-error';

class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error {
    return input[this.field] ? null : new RequiredFieldError();
  }
}

export { RequiredFieldValidation };
