import { HttpError } from './errors.http-error';

export class NotFound extends HttpError {
  static status = 404;
  static defaultMessage = "La page que vous demandez n'existe pas.";

  constructor(message: string = NotFound.defaultMessage) {
    super(message, NotFound.status);
  }
}
