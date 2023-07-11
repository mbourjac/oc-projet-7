import { Link } from 'react-router-dom';
import styles from './Tag.module.scss';

type TagProps = {
  tag: string;
};

export const Tag = ({ tag }: TagProps) => {
  return (
    <Link to={`..?tag=${tag}`} relative="path" className={styles.tag}>
      {tag}
    </Link>
  );
};
