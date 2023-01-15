import { AccountModel } from '@/domain/models/AccountModel';

interface AuthenticationParams {
  email: string;
  password: string;
}

interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>;
}

export { Authentication, AuthenticationParams };
