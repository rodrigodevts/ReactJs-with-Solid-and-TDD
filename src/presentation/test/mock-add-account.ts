import { AccountModel } from '@/domain/models/AccountModel';
import { mockAccountModel } from '@/domain/test/mock-account';
import { AddAccount, AddAccountParams } from '@/domain/useCases/add-account';

class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  params: AddAccountParams;
  callsCount = 0;

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}

export { AddAccountSpy };
