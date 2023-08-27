import { useEffect, useRef } from 'react';
import styles from './InfiniteScroller.module.scss';

type InfiniteScrollerProps = {
  loadNext: (page: number) => void;
  currentPage: number;
  isLoading: boolean;
};

export const InfiniteScroller = ({
  loadNext,
  currentPage,
  isLoading,
}: InfiniteScrollerProps) => {
  const intersectionRef = useRef(null);

  useEffect(() => {
    if (!intersectionRef.current) {
      throw Error('intersectionRef is not assigned');
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        observer.unobserve(entry.target);
        loadNext(currentPage + 1);
      }
    });

    observer.observe(intersectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [currentPage]);

  return (
    <div ref={intersectionRef} className={styles.trigger}>
      {isLoading && (
        <div className={styles.loader}>
          {Array.from({ length: 3 }, (_, index) => (
            <span key={index} className={styles.dot}></span>
          ))}
        </div>
      )}
    </div>
  );
};
