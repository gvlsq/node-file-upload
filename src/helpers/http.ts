export enum HttpStatusCode {
  BadRequest = 400,
  UnsupportedMediaType = 415,
  InternalServerError = 500
}

export class HttpError extends Error {
  code: HttpStatusCode;

  constructor(code: HttpStatusCode, message: string) {
    super(message);

    this.code = code;
  }
}

export const hasImageMIMEType = (mimeType: string): Boolean => {
  const imageMIMETypes: string[] = [
    "image/apng",
    "image/avif",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon"
  ];

  return imageMIMETypes.includes(mimeType);
}
