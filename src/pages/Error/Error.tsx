import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { HttpError } from '../../errors/errors.http-error';
import { NotFound } from '../../errors/errors.not-found';
import styles from './Error.module.scss';

export const Error = () => {
  const error: unknown = useRouteError();
  let status = 500;
  let message = 'Une erreur est survenue.';

  if (error instanceof HttpError) {
    status = error.status;
    message = error.message;
  }

  if (isRouteErrorResponse(error)) {
    status = error.status;

    if (status === NotFound.status) {
      message = NotFound.defaultMessage;
    }
  }

  return (
    <div className={styles.error}>
      <h1 className={styles.status}>{status.toString()}</h1>
      <h2 className={styles.message}>{`Oups ! ${message}`}</h2>
      <Link to="/" className={styles.link}>
        Retourner sur la page d’accueil
      </Link>
    </div>
  );
};
