const HttpStatus = Object.freeze({
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  GONE: 410,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
});

const HttpMessage = Object.freeze({
  OK: "OK",
  CREATED: "Created",
  ACCEPTED: "Accepted",
  NO_CONTENT: "No Content",
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Not Found",
  METHOD_NOT_ALLOWED: "Method Not Allowed",
  CONFLICT: "Conflict",
  GONE: "Gone",
  PAYLOAD_TOO_LARGE: "Payload Too Large",
  UNSUPPORTED_MEDIA_TYPE: "Unsupported Media Type",
  TOO_MANY_REQUESTS: "Too Many Requests",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  NOT_IMPLEMENTED: "Not Implemented",
  BAD_GATEWAY: "Bad Gateway",
  SERVICE_UNAVAILABLE: "Service Unavailable",
  GATEWAY_TIMEOUT: "Gateway Timeout",
});

class HttpException extends Error {
  constructor(
    message = HttpMessage.INTERNAL_SERVER_ERROR,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    error = null
  ) {
    super(message);
    this.error = error;
    this.status = status;
    this.message = message;
  }
}

class BadRequestException extends HttpException {
  constructor(error) {
    super(HttpMessage.BAD_REQUEST, HttpStatus.BAD_REQUEST, error);
  }
}

function HttpExceptionsMiddleware(error, _request, response, _next) {
  const reason = error.error || "Something went wrong";
  const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message || HttpMessage.INTERNAL_SERVER_ERROR;

  response.status(status).json({ status, message, error: reason });
}
