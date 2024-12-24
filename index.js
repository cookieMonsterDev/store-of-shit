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
  NOT_ACCEPTABLE: 406,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_ENTITY: 422,
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
  NOT_ACCEPTABLE: "Not Acceptable",
  REQUEST_TIMEOUT: "Request Timeout",
  CONFLICT: "Conflict",
  GONE: "Gone",
  PAYLOAD_TOO_LARGE: "Payload Too Large",
  UNSUPPORTED_MEDIA_TYPE: "Unsupported Media Type",
  UNPROCESSABLE_ENTITY: "Unprocessable Entity",
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

class UnauthorizedException extends HttpException {
  constructor(error) {
    super(HttpMessage.UNAUTHORIZED, HttpStatus.UNAUTHORIZED, error);
  }
}

class NotFoundException extends HttpException {
  constructor(error) {
    super(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND, error);
  }
}

class ForbiddenException extends HttpException {
  constructor(error) {
    super(HttpMessage.FORBIDDEN, HttpStatus.FORBIDDEN, error);
  }
}

class NotAcceptableException extends HttpException {
  constructor(error) {
    super(HttpMessage.NOT_ACCEPTABLE, HttpStatus.NOT_ACCEPTABLE, error);
  }
}

class RequestTimeoutException extends HttpException {
  constructor(error) {
    super(HttpMessage.REQUEST_TIMEOUT, HttpStatus.REQUEST_TIMEOUT, error);
  }
}

class ConflictException extends HttpException {
  constructor(error) {
    super(HttpMessage.CONFLICT, HttpStatus.CONFLICT, error);
  }
}

class GoneException extends HttpException {
  constructor(error) {
    super(HttpMessage.GONE, HttpStatus.GONE, error);
  }
}

class PayloadTooLargeException extends HttpException {
  constructor(error) {
    super(HttpMessage.PAYLOAD_TOO_LARGE, HttpStatus.PAYLOAD_TOO_LARGE, error);
  }
}

class UnsupportedMediaTypeException extends HttpException {
  constructor(error) {
    super(
      HttpMessage.UNSUPPORTED_MEDIA_TYPE,
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      error
    );
  }
}

class UnprocessableEntityException extends HttpException {
  constructor(error) {
    super(
      HttpMessage.UNPROCESSABLE_ENTITY,
      HttpStatus.UNPROCESSABLE_ENTITY,
      error
    );
  }
}

class InternalServerErrorException extends HttpException {
  constructor(error) {
    super(
      HttpMessage.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error
    );
  }
}

class NotImplementedException extends HttpException {
  constructor(error) {
    super(HttpMessage.NOT_IMPLEMENTED, HttpStatus.NOT_IMPLEMENTED, error);
  }
}

class MethodNotAllowedException extends HttpException {
  constructor(error) {
    super(HttpMessage.METHOD_NOT_ALLOWED, HttpStatus.METHOD_NOT_ALLOWED, error);
  }
}

class BadGatewayException extends HttpException {
  constructor(error) {
    super(HttpMessage.BAD_GATEWAY, HttpStatus.BAD_GATEWAY, error);
  }
}

class GatewayTimeoutException extends HttpException {
  constructor(error) {
    super(HttpMessage.GATEWAY_TIMEOUT, HttpStatus.GATEWAY_TIMEOUT, error);
  }
}

function httpExceptionsHandler(error, _request, response, _next) {
  const reason = error.error || "Something went wrong";
  const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message || HttpMessage.INTERNAL_SERVER_ERROR;

  response.status(status).json({ status, message, error: reason });
}

async function asyncHandler(fn) {
  return function (...agrs) {
    return Promise.resolve(() => fn(...agrs)).catch(agrs[agrs.length - 1]);
  };
}

const Joi = require("joi");
const HttpException = require("./HttpException"); // Your custom exception class

const validateMiddleware = (schema) => {
  return (req, _res, next) => {
    const errors = [];
    const validationKeys = ["query", "params", "body"];

    validationKeys.forEach((key) => {
      if (!schema[key]) return;

      const { error, value } = schemas[key].validate(req[key], {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
      });

      if (error) errors.push(...error.details.map((detail) => detail.message));

      req[key] = value;
    });

    if (errors.length > 0) return next(new UNPROCESSABLE_ENTITY(errors));

    next();
  };
};

