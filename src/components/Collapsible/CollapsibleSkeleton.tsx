import styles from './CollapsibleSkeleton.module.scss';

type CollapsibleSkeletonProps = {
  classes?: string;
};

export const CollapsibleSkeleton = ({ classes }: CollapsibleSkeletonProps) => {
  return <div className={`${styles.collapsible} ${classes ?? ''}`}></div>;
};
