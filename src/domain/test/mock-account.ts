import { faker } from "@faker-js/faker";
import { AuthenticationParams } from "@/domain/useCases/Authentication";
import { AccountModel } from "../models/AccountModel";

const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.alpha(16),
});

export { mockAuthentication, mockAccountModel };
