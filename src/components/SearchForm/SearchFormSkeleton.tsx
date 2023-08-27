import styles from './SearchFormSkeleton.module.scss';
import searchFormStyles from './SearchForm.module.scss';

export const SearchFormSkeleton = () => {
  return (
    <div className={searchFormStyles.form}>
      <div className={styles.input}></div>
    </div>
  );
};
