import { nanoid } from 'nanoid';
import { TagSkeleton } from '../Tag/TagSkeleton';
import tagSearchStyles from './TagSearch.module.scss';

export const TagSearchSkeleton = () => {
  return (
    <div className={tagSearchStyles.tags}>
      {Array.from({ length: 12 }, (_) => (
        <TagSkeleton key={nanoid()} />
      ))}
    </div>
  );
};
