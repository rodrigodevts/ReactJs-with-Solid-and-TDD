import { FieldValidation } from '@/validation/protocols/field-validation';

class FieldValidationSpy implements FieldValidation {
  error: Error = null;

  constructor(readonly field: string) {}

  validate(input: object): Error {
    return this.error;
  }
}

export { FieldValidationSpy };
