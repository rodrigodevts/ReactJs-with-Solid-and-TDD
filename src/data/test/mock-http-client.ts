import { HttpPostClient } from "../protocols/http/http-post-client";

class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  async post(url: string): Promise<void> {
    this.url = url;
    return await Promise.resolve();
  }
}

export { HttpPostClientSpy };
