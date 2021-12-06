export enum HttpStatusCode {
  BadRequest = 400,
  InternalServerError = 500
}

export class HttpError extends Error {
  code: HttpStatusCode;

  constructor(code: HttpStatusCode, message: string) {
    super(message);

    this.code = code;
  }
}
