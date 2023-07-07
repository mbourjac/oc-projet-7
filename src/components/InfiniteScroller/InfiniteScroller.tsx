import { useEffect, useRef } from 'react';
import { FetcherWithComponents } from 'react-router-dom';
import { nanoid } from 'nanoid';
import styles from './InfiniteScroller.module.scss';

type InfiniteScrollerProps<T> = {
  fetcher: FetcherWithComponents<T>;
  nextPage: number;
  isIndex: boolean;
};

export const InfiniteScroller = <T,>({
  fetcher,
  nextPage,
  isIndex,
}: InfiniteScrollerProps<T>) => {
  const intersectionRef = useRef(null);
  const loadNext = (page: number) => {
    const query = `?${isIndex ? 'index&' : ''}page=${page}`;

    fetcher.load(query);
  };

  useEffect(() => {
    if (!intersectionRef.current) {
      throw Error('intersectionRef is not assigned');
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        loadNext(nextPage);
      }
    });

    observer.observe(intersectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetcher.data]);

  return (
    <div ref={intersectionRef} className={styles.trigger}>
      {fetcher.state === 'loading' && (
        <div className={styles.loader}>
          {Array.from({ length: 3 }, (_) => (
            <span className={styles.dot} key={nanoid()}></span>
          ))}
        </div>
      )}
    </div>
  );
};
