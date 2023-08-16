import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { StrategyButton } from './StrategyButton';
import { IRoomAddress } from '../../data/rooms/rooms.types';
import {
  DefaultTransportationStrategy,
  TransportationStrategy,
} from '../../data/transportation/transportation.strategy';
import { DataGouvGeocodingService } from '../../data/transportation/transportation.geocoding';
import { Address } from '../../data/transportation/transportation.address';
import { TransportationSearch } from '../../data/transportation/transportation.search';
import styles from './Transportation.module.scss';

type TransportationProps = {
  roomAddress: IRoomAddress;
};

const dataGouvGeocodingService = new DataGouvGeocodingService();
const transportationSearch = new TransportationSearch();
const transportationStrategies: Record<
  string,
  { label: string; strategy: TransportationStrategy }
> = {
  default: {
    label: 'Durée approximative',
    strategy: new DefaultTransportationStrategy(),
  },
};

export const Transportation = ({
  roomAddress: { number, street, city, postcode },
}: TransportationProps) => {
  const [selectedStrategy, setSelectedStrategy] =
    useState<TransportationStrategy>(transportationStrategies.default.strategy);
  const [destinationInput, setDestinationInput] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSearchModified, setIsSearchModified] = useState(false);

  const origin = new Address(
    `${number} ${street} ${city} ${postcode}`,
    dataGouvGeocodingService
  );
  const isDestinationInputEmpty = destinationInput.trim() === '';

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDestinationInput(event.target.value);
    setIsSearchModified(true);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && isSearchModified) {
      getStrategyResult(selectedStrategy);
    }
  };

  const handleSearchButtonClick = () => {
    getStrategyResult(selectedStrategy);
  };

  const handleStrategyButtonClick = async (strategyKey: string) => {
    getStrategyResult(transportationStrategies[strategyKey].strategy);
  };

  const getStrategyResult = async (strategy: TransportationStrategy) => {
    const destination = new Address(destinationInput, dataGouvGeocodingService);

    setSelectedStrategy(strategy);
    transportationSearch.setStrategy(strategy);

    const { success, result } = await transportationSearch.displaySearchResult(
      origin,
      destination
    );

    setIsError(!success);
    setSearchResult(result);
    setIsSearchModified(false);
  };

  return (
    <section className={styles.transportation}>
      <h2 className={styles.heading}>À proximité</h2>
      <div className={styles.strategies}>
        {Object.keys(transportationStrategies).map((strategyKey) => {
          const { label, strategy } = transportationStrategies[strategyKey];

          return (
            <StrategyButton
              key={strategyKey}
              strategyKey={strategyKey}
              handleStrategySearch={handleStrategyButtonClick}
              isSelected={selectedStrategy === strategy}
              isDisabled={isDestinationInputEmpty}
              isSearchModified={isSearchModified}
            >
              {label}
            </StrategyButton>
          );
        })}
      </div>
      <div className={styles.search}>
        <input
          type="search"
          value={destinationInput}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className={styles.input}
          placeholder="1 Place de la République 75003 Paris"
          aria-label="Rechercher une adresse à proximité"
        />
        <button
          disabled={isDestinationInputEmpty || !isSearchModified}
          className={styles.submit}
          onClick={handleSearchButtonClick}
        >
          Rechercher
        </button>
      </div>
      <p className={`${styles.result}  ${isError ? styles.error : ''}`.trim()}>
        {searchResult ? (
          searchResult
        ) : (
          <span className={styles.placeholder}>Mode et temps de trajet</span>
        )}
      </p>
    </section>
  );
};
