import { HttpPostClientSpy } from '@/data/test/mock-http';
import { AccountModel } from '@/domain/models/AccountModel';
import { AddAccount, AddAccountParams } from '@/domain/useCases/add-account';

class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClientSpy<
      AddAccountParams,
      AccountModel
    >
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    return null;
  }
}

export { RemoteAddAccount };
