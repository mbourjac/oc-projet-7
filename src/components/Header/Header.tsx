import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import redLogo from '@images/red-logo.svg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={redLogo} alt="Logo Kasa" className={styles.logo} />
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Accueil
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          À propos
        </NavLink>
      </nav>
    </header>
  );
};
