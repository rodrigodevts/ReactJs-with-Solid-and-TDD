import { faker } from '@faker-js/faker';
import { AddAccountParams } from '../useCases/add-account';

const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password();

  return {
    email: faker.internet.email(),
    name: faker.internet.userName(),
    password,
    passwordConfirmation: password,
  };
};

export { mockAddAccountParams };
