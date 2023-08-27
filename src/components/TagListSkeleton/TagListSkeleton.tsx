import styles from './TagListSkeleton.module.scss';

type TagListSkeletonProps = {
  length: number;
  tagsClasses?: string;
};

export const TagListSkeleton = ({
  length,
  tagsClasses,
}: TagListSkeletonProps) => {
  return (
    <div className={`${styles.tags} ${tagsClasses ?? ''}`.trim()}>
      {Array.from({ length: length }, (_, index) => (
        <div key={index} className={styles.tag}></div>
      ))}
    </div>
  );
};
