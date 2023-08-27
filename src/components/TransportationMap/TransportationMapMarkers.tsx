import { useEffect, useRef, useState } from 'react';
import { Circle, FeatureGroup, useMap } from 'react-leaflet';
import { FeatureGroup as LeafletFeatureGroup } from 'leaflet';
import { Address } from '../../data/transportation/transportation.address';
import { ICoordinates } from '../../data/transportation/transportation.types';

type TransportationMapMarkersProps = {
  originCoordinates: ICoordinates;
  destination: Address | null;
};

export const TransportationMapMarkers = ({
  originCoordinates,
  destination,
}: TransportationMapMarkersProps) => {
  const map = useMap();
  const [destinationCoordinates, setDestinationCoordinates] =
    useState<ICoordinates | null>(null);
  const featureGroupRef = useRef<LeafletFeatureGroup>(null);

  useEffect(() => {
    if (!destination) return;

    const loadDestinationCoordinates = async () => {
      const destinationCoordinates = await destination.coordinates;
      setDestinationCoordinates(destinationCoordinates);
    };

    loadDestinationCoordinates();
  }, [destination]);

  useEffect(() => {
    if (!map || !destinationCoordinates) return;

    if (!featureGroupRef.current) {
      throw new Error('contentRef is not assigned');
    }

    map.fitBounds(featureGroupRef.current.getBounds());
  }, [map, destinationCoordinates]);

  return (
    <FeatureGroup ref={featureGroupRef}>
      <Circle
        center={[originCoordinates.latitude, originCoordinates.longitude]}
        pathOptions={{ color: '#ff6060' }}
        radius={200}
      />
      {destinationCoordinates && (
        <Circle
          center={[
            destinationCoordinates.latitude,
            destinationCoordinates.longitude,
          ]}
          pathOptions={{ color: 'blue' }}
          radius={50}
        />
      )}
    </FeatureGroup>
  );
};
