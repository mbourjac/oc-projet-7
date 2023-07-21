import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IRoomAddress } from '../../data/rooms/rooms.types';
import styles from './Transportation.module.scss';
import {
  MockBusStrategy,
  MockBikingStrategy,
  MockWalkingStrategy,
  TransportationStrategy,
} from '../../data/transportation/transportation.strategy';
import { DataGouvGeocodingService } from '../../data/transportation/transportation.geocoding';
import { Address } from '../../data/transportation/transportation.address';
import { TransportationSearch } from '../../data/transportation/transportation.search';

type TransportationProps = {
  roomAddress: IRoomAddress;
};

const transportationStrategies: Record<string, TransportationStrategy> = {
  walking: new MockWalkingStrategy(),
  biking: new MockBikingStrategy(),
  bus: new MockBusStrategy(),
};
const transportationSearch = new TransportationSearch();
const dataGouvGeocodingService = new DataGouvGeocodingService();

export const Transportation = ({ roomAddress }: TransportationProps) => {
  const [destinationInput, setDestinationInput] = useState('');
  const [strategy, setStrategy] = useState<TransportationStrategy | null>(null);
  const [durationResult, setDurationResult] = useState<string | null>(null);

  const { number, street, city, postcode } = roomAddress;
  const origin = new Address(
    `${number} ${street} ${city} ${postcode}`,
    dataGouvGeocodingService
  );

  const handleSearch = async () => {
    if (strategy === null) {
      await handleFastestSearch();
    } else {
      await getStrategyDuration(strategy);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDestinationInput(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && destinationInput.trim() !== '') {
      handleSearch();
    }
  };

  const handleWalkingSearch = async () => {
    getStrategyDuration(transportationStrategies.walking);
  };

  const handleBikingSearch = async () => {
    getStrategyDuration(transportationStrategies.biking);
  };

  const handleBusSearch = async () => {
    getStrategyDuration(transportationStrategies.bus);
  };

  const handleFastestSearch = async () => {
    setStrategy(null);

    const destination = new Address(destinationInput, dataGouvGeocodingService);
    const fastestDuration = await transportationSearch.displayFastestDuration(
      origin,
      destination,
      transportationStrategies
    );

    setDurationResult(fastestDuration);
  };

  const getStrategyDuration = async (
    transportationStrategy: TransportationStrategy
  ) => {
    const destination = new Address(destinationInput, dataGouvGeocodingService);
    const strategy = transportationStrategy;

    setStrategy(strategy);
    transportationSearch.setStrategy(strategy);

    const duration = await transportationSearch.displayDuration(
      origin,
      destination
    );

    setDurationResult(duration);
  };

  return (
    <section className={styles.transportation}>
      <h2 className={styles.heading}> À proximité</h2>
      <div className={styles.strategies}>
        <button
          disabled={destinationInput.trim() === ''}
          className={`${styles.button} ${
            strategy === null ? styles.selected : ''
          }`.trim()}
          onClick={handleFastestSearch}
        >
          Le plus rapide
        </button>
        <button
          disabled={destinationInput.trim() === ''}
          className={`${styles.button} ${
            strategy instanceof MockWalkingStrategy ? styles.selected : ''
          }`.trim()}
          onClick={handleWalkingSearch}
        >
          À pied
        </button>
        <button
          disabled={destinationInput.trim() === ''}
          className={`${styles.button} ${
            strategy instanceof MockBikingStrategy ? styles.selected : ''
          }`.trim()}
          onClick={handleBikingSearch}
        >
          À vélo
        </button>
        <button
          disabled={destinationInput.trim() === ''}
          className={`${styles.button} ${
            strategy instanceof MockBusStrategy ? styles.selected : ''
          }`.trim()}
          onClick={handleBusSearch}
        >
          En bus
        </button>
      </div>
      <div className={styles.search}>
        <input
          type="search"
          value={destinationInput}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className={styles.input}
          placeholder="Rechercher une adresse"
          aria-label="Rechercher une adresse à proximité"
        />
        <p className={styles.result}>
          {durationResult ? (
            durationResult
          ) : (
            <span className={styles.placeholder}>Temps de trajet</span>
          )}
        </p>
      </div>
    </section>
  );
};
