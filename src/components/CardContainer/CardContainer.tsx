import styles from './CardContainer.module.scss';

type CardContainerProps = {
  children?: React.ReactNode;
};

export const CardContainer = ({ children }: CardContainerProps) => {
  return <section className={styles.rooms}>{children}</section>;
};
