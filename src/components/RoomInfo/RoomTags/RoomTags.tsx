import styles from './RoomTags.module.scss';

type RoomTagsProps = {
  tags: string[];
  tagsClasses?: string;
};

export const RoomTags = ({ tags, tagsClasses }: RoomTagsProps) => {
  return (
    <ul className={`${styles.tags} ${tagsClasses ?? ''}`.trim()}>
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
};
