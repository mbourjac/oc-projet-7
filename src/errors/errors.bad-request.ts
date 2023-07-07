import { HttpError } from './errors.http-error';

export class BadRequest extends HttpError {
  static status = 400;
  static defaultMessage = 'Nous ne pouvons pas traiter cette requête.';

  constructor(message: string = BadRequest.defaultMessage) {
    super(message, BadRequest.status);
  }
}
