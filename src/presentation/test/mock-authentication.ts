import { AccountModel } from '@/domain/models/AccountModel';
import { mockAccountModel } from '@/domain/test/mock-account';
import {
  Authentication,
  AuthenticationParams,
} from '@/domain/useCases/Authentication';

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  callsCount = 0;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}

export { AuthenticationSpy };
