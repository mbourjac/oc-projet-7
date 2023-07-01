import { nanoid } from 'nanoid';
import { CardSkeleton } from '../Card/CardSkeleton';

type CardListSkeletonProps = {
  length: number;
};

export const CardListSkeleton = ({ length }: CardListSkeletonProps) => {
  return Array.from({ length }, (_) => <CardSkeleton key={nanoid()} />);
};
