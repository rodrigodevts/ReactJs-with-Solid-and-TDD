import { Validation } from '../protocols/validation';

class ValidationStub implements Validation {
  errorMessage: string;

  validate(fieldName: string, Input: object) {
    return this.errorMessage;
  }
}

export { ValidationStub };
