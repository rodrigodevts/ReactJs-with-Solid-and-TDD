import { faker } from "@faker-js/faker";
import { IAuthenticationParams } from "../useCases/IAuthentication";

const mockAuthentication = (): IAuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export { mockAuthentication };
