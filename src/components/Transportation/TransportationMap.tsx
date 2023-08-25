import { useEffect, useState } from 'react';
import { Circle, MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Address } from '../../data/transportation/transportation.address';
import { ICoordinates } from '../../data/transportation/transportation.types';
import styles from './TransportationMap.module.scss';

type TransportationMapProps = {
  origin: Address;
  destination: Address | null;
};

export const TransportationMap = ({
  origin,
  destination,
}: TransportationMapProps) => {
  const [originCoordinates, setOriginCoordinates] =
    useState<ICoordinates | null>(null);
  const [destinationCoordinates, setDestinationCoordinates] =
    useState<ICoordinates | null>(null);

  useEffect(() => {
    const loadOriginCoordinates = async () => {
      const originCoordinates = await origin.coordinates;
      setOriginCoordinates(originCoordinates);
    };

    loadOriginCoordinates();
  }, [origin]);

  useEffect(() => {
    if (!destination) return;

    const loadDestinationCoordinates = async () => {
      const destinationCoordinates = await destination.coordinates;
      setDestinationCoordinates(destinationCoordinates);
    };

    loadDestinationCoordinates();
  }, [destination]);

  return originCoordinates ? (
    <MapContainer
      center={[originCoordinates.latitude, originCoordinates.longitude]}
      zoom={14}
      scrollWheelZoom={true}
      className={styles.map}
      zoomControl={false}
    >
      <TileLayer
        attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
      />
      <ZoomControl position="topright" />
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
    </MapContainer>
  ) : (
    'Loading map...'
  );
};
