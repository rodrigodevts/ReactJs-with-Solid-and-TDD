type HttpPostParams = {
  url: string;
};

interface HttpPostClient {
  post: (params: HttpPostParams) => Promise<void>;
}

export { HttpPostClient, HttpPostParams };
