import { Outlet, useNavigation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './AppLayout.module.scss';

type AppLayoutProps = {
  children?: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { state } = useNavigation();

  return (
    <>
      <Header />
      <main className={styles.main}>
        {children ??
          (state === 'loading' ? (
            <div className={styles.spinner}></div>
          ) : (
            <Outlet />
          ))}
      </main>
      <Footer />
    </>
  );
};
