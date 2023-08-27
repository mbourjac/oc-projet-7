import { CardSkeleton } from '../Card/CardSkeleton';

type CardListSkeletonProps = {
  length: number;
};

export const CardListSkeleton = ({ length }: CardListSkeletonProps) => {
  return (
    <>
      {Array.from({ length }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </>
  );
};
