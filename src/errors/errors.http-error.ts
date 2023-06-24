import { HttpErrorResponse } from './errors.types';

export class HttpError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
    this.name = this.constructor.name;
  }

  toJSON(): HttpErrorResponse {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
    };
  }
}
