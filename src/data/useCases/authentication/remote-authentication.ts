import { HttpPostClient } from "../../protocols/http/http-post-client";

class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {
    console.log(1);
  }

  async auth(): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
    });
  }
}

export { RemoteAuthentication };
