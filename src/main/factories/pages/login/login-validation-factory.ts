import { ValidationBuilder } from '@/validation/validators/builder/validation-builder';
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite';

// Teste importante, se errar o nome do campo no arquivo de produção, o campo ficaria
// sem validação.
const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ]);
};

export { makeLoginValidation };
