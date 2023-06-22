import styles from './Tag.module.scss';

type TagProps = {
  tag: string;
};

export const Tag = ({ tag }: TagProps) => {
  return <button className={styles.tag}>{tag}</button>;
};
