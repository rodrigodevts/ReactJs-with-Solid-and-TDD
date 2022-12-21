import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { IAuthenticationParams } from "@/domain/useCases/IAuthentication";
import { HttpPostClient } from "@/data/protocols/http/http-post-client";

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
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        return await Promise.resolve();
    }
  }
}

export { RemoteAuthentication };
