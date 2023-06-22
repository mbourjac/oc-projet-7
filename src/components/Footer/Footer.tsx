import styles from './Footer.module.scss';
import whiteLogo from '@images/white-logo.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={whiteLogo} alt="Logo Kasa" className={styles.logo} />
      <p className={styles.copyright}>© 2020 Kasa. All rights reserved</p>
    </footer>
  );
};
