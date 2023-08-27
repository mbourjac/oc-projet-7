import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import redLogo from '@images/red-logo.svg';

export const Header = () => {
  const getClassName = ({ isActive }: { isActive: boolean }) => {
    return `${styles.link} ${isActive ? styles.active : ''}`.trim();
  };

  return (
    <header className={styles.header}>
      <img src={redLogo} alt="Logo Kasa" className={styles.logo} />
      <nav role="navigation" aria-label="menu">
        <ul className={styles.menu}>
          <li>
            <NavLink to="/" className={getClassName}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/rooms" className={getClassName}>
              Logements
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={getClassName}>
              À propos
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
