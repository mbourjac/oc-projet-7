import { Link } from 'react-router-dom';
import styles from './TagLink.module.scss';

type TagProps = {
  tag: string;
};

export const TagLink = ({ tag }: TagProps) => {
  return (
    <Link
      to={`..?tag=${tag}`}
      relative="path"
      className={styles.tag}
      aria-label={`Filtre : ${tag}`}
    >
      {tag}
    </Link>
  );
};
