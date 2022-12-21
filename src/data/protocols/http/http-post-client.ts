import { HttpResponse } from ".";

type HttpPostParams<T> = {
  url: string;
  body?: T;
};

interface HttpPostClient<T, R> {
  post: (params: HttpPostParams<T>) => Promise<HttpResponse<R>>;
}

export { HttpPostClient, HttpPostParams };
