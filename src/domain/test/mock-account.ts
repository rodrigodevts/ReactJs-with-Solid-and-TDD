import { faker } from '@faker-js/faker';
import { AuthenticationParams } from '@/domain/useCases/authentication';
import { AccountModel } from '@/domain/models/AccountModel';

const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const mockAccountModel = (): AccountModel => ({
  token: faker.random.alpha(16),
});

export { mockAuthentication, mockAccountModel };
