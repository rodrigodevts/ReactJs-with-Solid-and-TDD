import { Validation } from '../protocols/validation';

class ValidationStub implements Validation {
  errorMessage: string;

  validate(fieldName: string, fieldValue: string) {
    return this.errorMessage;
  }
}

export { ValidationStub };
