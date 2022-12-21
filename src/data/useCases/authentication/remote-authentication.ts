import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { IAuthenticationParams } from "@/domain/useCases/IAuthentication";
import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { UnexpectedError } from "@/domain/errors/unexpected-error";

class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {
    console.log(1);
  }

  async auth(params: IAuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export { RemoteAuthentication };
