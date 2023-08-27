import { Link } from 'react-router-dom';
import styles from './RoomTags.module.scss';

type RoomTagsProps = {
  tags: string[];
  tagsClasses?: string;
};

export const RoomTags = ({ tags, tagsClasses }: RoomTagsProps) => {
  return (
    <>
      <div className={`${styles.tags} ${tagsClasses ?? ''}`.trim()}>
        {tags.map((tag) => (
          <Link
            key={tag}
            to={`..?tag=${tag}`}
            relative="path"
            className={`${styles.tag} ${styles.selected}`}
            aria-label={`Filtre : ${tag}`}
          >
            {tag}
          </Link>
        ))}
      </div>
    </>
  );
};
