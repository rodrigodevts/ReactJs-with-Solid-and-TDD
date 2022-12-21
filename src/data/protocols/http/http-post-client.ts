import { HttpResponse } from "./http-response";

type HttpPostParams<T> = {
  url: string;
  body?: T;
};

interface HttpPostClient<T, R> {
  post: (params: HttpPostParams<T>) => Promise<HttpResponse<R>>;
}

export { HttpPostClient, HttpPostParams };
