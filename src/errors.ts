export class ConfigurationError extends Error {}
export class ParsingError extends Error {}
export class BadRequestError extends Error {}
export class UnauthorizedError extends Error {}
export class NotFoundError extends Error {}
export class InternalServerError extends Error {}
export class ServiceUnavailableError extends Error {}
export class UnexpectedError extends Error {}

export const errors = {
  ConfigurationError,
  ParsingError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
  ServiceUnavailableError,
  UnexpectedError,
};
