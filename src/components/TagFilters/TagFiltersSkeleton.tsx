import { nanoid } from 'nanoid';
import { TagSkeleton } from '../Tag/TagSkeleton';
import tagFiltersStyles from './TagFilters.module.scss';

export const TagFiltersSkeleton = () => {
  return (
    <div className={tagFiltersStyles.tags}>
      {Array.from({ length: 12 }, (_) => (
        <TagSkeleton key={nanoid()} />
      ))}
    </div>
  );
};
