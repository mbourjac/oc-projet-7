import { ISearchResult } from '../../data/transportation/transportation.types';
import styles from './TransportationResult.module.scss';

type TransportationResultProps = {
  searchResult: ISearchResult | null;
};

export const TransportationResult = ({
  searchResult,
}: TransportationResultProps) => {
  const isSearchSuccess = searchResult && searchResult.status === 'success';
  const isSearchError = searchResult && searchResult.status === 'error';

  return (
    <div className={styles.result}>
      <p
        className={`${styles.label} ${
          isSearchSuccess ? styles.success : ''
        }`.trim()}
      >
        Mode(s) et temps de trajet
      </p>
      {isSearchSuccess ? (
        <ul className={styles.list}>
          {searchResult.data.map((result) => (
            <li key={result} className={styles.item}>
              {result}
            </li>
          ))}
        </ul>
      ) : (
        isSearchError && <p className={styles.error}>{searchResult.message}</p>
      )}
    </div>
  );
};
