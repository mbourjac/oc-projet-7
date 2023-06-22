import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.status}>404</h1>
      <h2 className={styles.message}>
        Oups! La page que vous demandez n'existe pas.
      </h2>
      <Link to="/" className={styles.link}>
        Retourner sur la page d’accueil
      </Link>
    </div>
  );
};
