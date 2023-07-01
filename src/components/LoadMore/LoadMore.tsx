import { FetcherWithComponents } from 'react-router-dom';
import styles from './LoadMore.module.scss';

type LoaderData = {
  currentPage: number;
  totalPages: number;
};

type LoadMoreProps = {
  loaderData: LoaderData;
  fetcher: FetcherWithComponents<LoaderData>;
  isIndex: boolean;
};

export const LoadMore = ({ loaderData, fetcher, isIndex }: LoadMoreProps) => {
  const { currentPage: initialPage, totalPages } = loaderData;
  const showLoadMore = fetcher.data
    ? fetcher.data.currentPage < totalPages
    : initialPage < totalPages;

  const loadMore = () => {
    const page = fetcher.data ? fetcher.data.currentPage + 1 : initialPage + 1;
    const query = `?${isIndex && 'index&'}page=${page}`;

    fetcher.load(query);
  };

  return (
    showLoadMore && (
      <button
        onClick={loadMore}
        className={`${styles.more} ${
          fetcher.state === 'loading' ? styles.loading : ''
        } ${
          fetcher.data
            ? fetcher.data.currentPage === totalPages - 1 &&
              fetcher.state === 'loading' &&
              styles.hide
            : ''
        }`.trim()}
      >
        Afficher plus
      </button>
    )
  );
};
