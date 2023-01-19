import { Validation } from '@/presentation/protocols/validation';
import { FieldValidation } from '@/validation/protocols/field-validation';

class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  // Esse é o primeiro método que a classe executa.
  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, input: object): string {
    const validators = this.validators.filter((v) => v.field === fieldName);
    for (const validator of validators) {
      const error = validator.validate(input);
      if (error) {
        return error.message;
      }
    }
  }
}

export { ValidationComposite };
