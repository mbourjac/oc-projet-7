import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import redLogo from '@images/red-logo.svg';

export const Header = () => {
  const getClassName = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.active : ''}`.trim();

  return (
    <header className={styles.header}>
      <img src={redLogo} alt="Logo Kasa" className={styles.logo} />
      <nav className={styles.nav}>
        <NavLink to="/" className={getClassName}>
          Accueil
        </NavLink>
        <NavLink to="/about" className={getClassName}>
          À propos
        </NavLink>
      </nav>
    </header>
  );
};
