import { useState } from 'react';
import { TransportationForm } from './TransportationForm';
import { TransportationMap } from './TransportationMap';
import {
  IAddress,
  ISearchResult,
  TransportationStrategies,
} from '../../data/transportation/transportation.types';
import {
  DefaultTransportationStrategy,
  NavitiaTransportationStrategy,
} from '../../data/transportation/transportation.strategy';
import { DataGouvGeocodingService } from '../../data/transportation/transportation.geocoding';
import { Address } from '../../data/transportation/transportation.address';
import { TransportationSearch } from '../../data/transportation/transportation.search';
import styles from './Transportation.module.scss';
import { TransportationResult } from './TransportationResult';

type TransportationProps = {
  roomAddress: IAddress;
};

const transportationStrategies: TransportationStrategies = {
  default: new DefaultTransportationStrategy(),
  navitia: new NavitiaTransportationStrategy(),
};
const transportationSearch = new TransportationSearch(
  Object.values(transportationStrategies)
);
const dataGouvGeocodingService = new DataGouvGeocodingService();

export const Transportation = ({ roomAddress }: TransportationProps) => {
  const [searchResult, setSearchResult] = useState<ISearchResult | null>(null);
  const [destination, setDestination] = useState<Address | null>(null);

  const origin = new Address(roomAddress, dataGouvGeocodingService);

  const handleTransportationSearch = (destinationAddress: IAddress) => {
    getStrategyResult(destinationAddress);
  };

  const getStrategyResult = async (destinationAddress: IAddress) => {
    const destination = new Address(
      destinationAddress,
      dataGouvGeocodingService
    );
    const searchResult = await transportationSearch.displaySearchResult(
      origin,
      destination
    );

    setSearchResult(searchResult);
    setDestination(destination);
  };

  return (
    <section className={styles.transportation}>
      <h2 className={styles.heading}>À proximité</h2>
      <TransportationForm
        transportationStrategies={transportationStrategies}
        handleTransportationSearch={handleTransportationSearch}
      />
      <TransportationResult searchResult={searchResult} />
      <TransportationMap origin={origin} destination={destination} />
    </section>
  );
};
