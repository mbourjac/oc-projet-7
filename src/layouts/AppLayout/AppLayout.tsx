import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import styles from './AppLayout.module.scss';

type AppLayoutProps = {
  children?: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{children ?? <Outlet />}</main>
      <Footer />
    </>
  );
};
