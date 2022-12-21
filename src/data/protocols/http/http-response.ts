enum HttpStatusCode {
  unauthorized = 401,
  noContent = 204,
}

type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: any;
};

export { HttpResponse, HttpStatusCode };
