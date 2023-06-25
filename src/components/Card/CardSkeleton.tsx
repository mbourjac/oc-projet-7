import styles from './CardSkeleton.module.scss';

export const CardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <div className={styles['title-line']}></div>
        <div className={styles['title-line']}></div>
      </div>
    </div>
  );
};
