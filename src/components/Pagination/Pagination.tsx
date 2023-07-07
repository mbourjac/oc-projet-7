import { Link } from 'react-router-dom';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  isLastPage: boolean;
  isLoading: boolean;
};

export const Pagination = ({
  currentPage,
  isLastPage,
  isLoading,
}: PaginationProps) => {
  const previousPage = `?page=${currentPage - 1}`;
  const nextPage = `?page=${currentPage + 1}`;

  const showPrevious = currentPage !== 1;
  const showNext = !isLastPage;

  return (
    <nav role="navigation" aria-label="pagination" className={styles.nav}>
      <ul className={styles.pagination}>
        <li>
          <Link
            to={previousPage}
            rel="prev"
            className={`${styles.link} ${
              !isLoading && showPrevious ? styles.active : ''
            }`.trim()}
          >
            Précédent
          </Link>
        </li>
        <li>
          <Link
            to={nextPage}
            rel="next"
            className={`${styles.link} ${
              !isLoading && showNext ? styles.active : ''
            }`.trim()}
          >
            Suivant
          </Link>
        </li>
      </ul>
    </nav>
  );
};
