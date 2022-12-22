import { AccountModel } from '../models';

interface AuthenticationParams {
  email: string;
  password: string;
}

interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>;
}

export { Authentication, AuthenticationParams };
