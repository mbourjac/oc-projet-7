import { CarouselSkeleton } from '../../components/Carousel/CarouselSkeleton';
import { RoomInfoSkeleton } from '../../components/RoomInfo/RoomInfoSkeleton';
import { CollapsibleSkeleton } from '../../components/Collapsible/CollapsibleSkeleton';
import roomStyles from './RoomDetails.module.scss';

export const RoomDetailsSkeleton = () => {
  return (
    <>
      <CarouselSkeleton />
      <RoomInfoSkeleton />
      <div className={roomStyles.collapsibles}>
        <CollapsibleSkeleton />
        <CollapsibleSkeleton />
      </div>
    </>
  );
};
