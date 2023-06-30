import { Link } from 'react-router-dom';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const previousPage = `?page=${currentPage - 1}`;
  const nextPage = `?page=${currentPage + 1}`;

  const showPrevious = currentPage !== 1;
  const showNext = currentPage < totalPages;

  return (
    <nav role="navigation" aria-label="pagination" className={styles.nav}>
      <ul className={styles.pagination}>
        {showPrevious && (
          <li>
            <Link to={previousPage} rel="prev" className={styles.link}>
              Précédent
            </Link>
          </li>
        )}
        {showNext && (
          <li>
            <Link to={nextPage} rel="next" className={styles.link}>
              Suivant
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
