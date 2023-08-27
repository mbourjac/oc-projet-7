import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

import { Address } from '../../data/transportation/transportation.address';
import { ICoordinates } from '../../data/transportation/transportation.types';
import styles from './TransportationMap.module.scss';
import { TransportationMapMarkers } from './TransportationMapMarkers';

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

  useEffect(() => {
    const loadOriginCoordinates = async () => {
      const originCoordinates = await origin.coordinates;
      setOriginCoordinates(originCoordinates);
    };

    loadOriginCoordinates();
  }, [origin]);

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
      <TransportationMapMarkers
        originCoordinates={originCoordinates}
        destination={destination}
      />
    </MapContainer>
  ) : (
    'Loading map...'
  );
};
