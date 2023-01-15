import { faker } from '@faker-js/faker';
import {
  HttpPostClient,
  HttpPostParams,
} from '../protocols/http/http-post-client';
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response';

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: {
    name: faker.internet.userName,
  },
});

class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;

    return this.response;
  }
}

export { mockPostRequest, HttpPostClientSpy };
