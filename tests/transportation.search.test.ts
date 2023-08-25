import { describe, it, expect, beforeEach } from 'vitest';
import { Address } from '../src/data/transportation/transportation.address';
import { MockGeocodingService } from '../src/data/transportation/transportation.geocoding';
import { MockTransportationStrategy } from '../src/data/transportation/transportation.strategy';
import { TransportationSearch } from '../src/data/transportation/transportation.search';
import { TransportationModes } from '../src/data/transportation/transportation.types';

describe('when searching for transportation', () => {
  const origin = new Address({
    number: '130',
    street: 'Boulevard Malesherbes',
    city: 'Paris',
  });
  const destination = new Address({
    number: '30',
    street: 'Rue de Monceau',
    city: 'Paris',
  });

  it('should return the fastest duration for each available mode', async () => {
    const defaultTransportationStrategy =
      MockTransportationStrategy.init().withResult(
        new Map<TransportationModes, number>([
          ['walking', 669],
          ['bike', 423],
          ['publicTransport', 815],
        ])
      );
    const apiTransportationStrategy =
      MockTransportationStrategy.init().withResult(
        new Map<TransportationModes, number>([
          ['walking', 934],
          ['publicTransport', 756],
        ])
      );
    const transportationStrategies = [
      defaultTransportationStrategy,
      apiTransportationStrategy,
    ];
    const transportationSearch = new TransportationSearch(
      transportationStrategies
    );

    const searchResult = await transportationSearch.displaySearchResult(
      origin,
      destination
    );

    if (searchResult.status === 'success') {
      expect(searchResult.data).toEqual([
        'À vélo : 8 minutes',
        'À pied : 12 minutes',
        'En transport : 13 minutes',
      ]);
    }
  });

  it('should never return less than 1 minute', async () => {
    const transportationStrategy = MockTransportationStrategy.init().withResult(
      new Map<TransportationModes, number>([
        ['walking', 56],
        ['bike', 201],
      ])
    );
    const transportationSearch = new TransportationSearch([
      transportationStrategy,
    ]);
    const destination = new Address({
      number: '136',
      street: 'Boulevard Malesherbes',
      city: 'Paris',
      postcode: '75017',
    });

    const searchResult = await transportationSearch.displaySearchResult(
      origin,
      destination
    );

    if (searchResult.status === 'success') {
      expect(searchResult.data).toEqual([
        'À pied : 1 minute',
        'À vélo : 4 minutes',
      ]);
    }
  });

  it('should notify the user when an error occurs', async () => {
    const transportationStrategy = MockTransportationStrategy.init();
    const transportationSearch = new TransportationSearch([
      transportationStrategy,
    ]);

    const searchResult = await transportationSearch.displaySearchResult(
      origin,
      destination
    );

    if (searchResult.status === 'error') {
      expect(searchResult.message).toBe('Une erreur est survenue');
    }
  });
});
