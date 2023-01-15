import { EmailInUseError } from '@/domain/errors/email-in-use-error';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { HttpPostClientSpy } from '@/data/test/mock-http';
import { AccountModel } from '@/domain/models/AccountModel';
import { AddAccount, AddAccountParams } from '@/domain/useCases/add-account';
import { UnexpectedError } from '@/domain/errors/unexpected-error';

class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClientSpy<
      AddAccountParams,
      AccountModel
    >
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.forbidden:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}

export { RemoteAddAccount };
