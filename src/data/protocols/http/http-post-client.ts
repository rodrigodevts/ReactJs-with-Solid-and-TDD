import { HttpResponse } from "./http-response";

type HttpPostParams = {
  url: string;
  body?: object;
};

interface HttpPostClient {
  post: (params: HttpPostParams) => Promise<HttpResponse>;
}

export { HttpPostClient, HttpPostParams };
