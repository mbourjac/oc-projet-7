import { describe, it, expect, beforeEach } from 'vitest';
import { Address } from '../src/data/transportation/transportation.address';
import { MockGeocodingService } from '../src/data/transportation/transportation.geocoding';
import {
  TransportationStrategy,
  MockTransportationStrategy,
} from '../src/data/transportation/transportation.strategy';
import { TransportationSearch } from '../src/data/transportation/transportation.search';

describe('when searching for transportation', () => {
  const geocodingData = [
    {
      addressIdentifier: '130 Boulevard Malesherbes Paris 75017',
      addressObject: {
        address: {
          number: 130,
          street: 'Boulevard Malesherbes',
          postcode: 75017,
          city: 'Paris',
        },
        coordinates: {
          longitude: 2.307903,
          latitude: 48.884888,
        },
      },
    },
    {
      addressIdentifier: '136 Boulevard Malesherbes Paris 75017',
      addressObject: {
        address: {
          number: 130,
          street: 'Boulevard Malesherbes',
          postcode: 75017,
          city: 'Paris',
        },
        coordinates: {
          longitude: 2.307272,
          latitude: 48.885404,
        },
      },
    },
    {
      addressIdentifier: '3 Rue Au Maire Paris 75003',
      addressObject: {
        address: {
          number: 3,
          street: 'Rue Au Maire',
          postcode: 75003,
          city: 'Paris',
        },
        coordinates: {
          longitude: 2.357469,
          latitude: 48.864391,
        },
      },
    },
  ];
  const geocodingService = MockGeocodingService.init().withData(geocodingData);
  const origin = new Address(
    '130 Boulevard Malesherbes Paris 75017',
    geocodingService
  );

  it('should return the fastest duration', async () => {
    const transportationStrategy = MockTransportationStrategy.init().withResult(
      {
        walking: 3391,
        bike: 1413,
        bus: 2423,
      }
    );
    const transportationSearch = new TransportationSearch(
      transportationStrategy
    );
    const destination = new Address(
      '3 Rue Au Maire Paris 75003',
      geocodingService
    );

    const { success, result } = await transportationSearch.displaySearchResult(
      origin,
      destination
    );

    expect(success).toBe(true);
    expect(result).toBe('À vélo : 24 minutes');
  });

  it('should never return less than 1 minute', async () => {
    const transportationStrategy = MockTransportationStrategy.init().withResult(
      {
        walking: 56,
        bike: 201,
      }
    );
    const transportationSearch = new TransportationSearch(
      transportationStrategy
    );
    const destination = new Address(
      '136 Boulevard Malesherbes Paris 75017',
      geocodingService
    );

    const { success, result } = await transportationSearch.displaySearchResult(
      origin,
      destination
    );

    expect(success).toBe(true);
    expect(result).toBe('À pied : 1 minute');
  });

  it('should notify the user when an error occurs', async () => {
    const transportationStrategy = MockTransportationStrategy.init();
    const transportationSearch = new TransportationSearch(
      transportationStrategy
    );
    const destination = new Address(
      '3 Rue Au Maire Paris 75003',
      geocodingService
    );

    const { success, result } = await transportationSearch.displaySearchResult(
      origin,
      destination
    );

    expect(success).toBe(false);
    expect(result).toBe('Une erreur est survenue.');
  });
});
