import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import redLogo from '@images/red-logo.svg';

export const Header = () => {
  const className = ({ isActive }: { isActive: boolean }) => {
    return `${styles.link} ${isActive ? styles.active : ''}`.trim();
  };

  return (
    <header className={styles.header}>
      <img src={redLogo} alt="Logo Kasa" className={styles.logo} />
      <nav role="navigation" aria-label="menu">
        <ul className={styles.menu}>
          <li>
            <NavLink to="/" className={className}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="rooms" className={className}>
              Logements
            </NavLink>
          </li>
          <li>
            <NavLink to="about" className={className}>
              À propos
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
