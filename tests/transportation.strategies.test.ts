import { describe, it, expect, beforeEach } from 'vitest';
import { Address } from '../src/data/transportation/transportation.address';
import { MockGeocodingService } from '../src/data/transportation/transportation.geocoding';
import {
  MockTransportationStrategy,
  NavitiaTransportationStrategy,
} from '../src/data/transportation/transportation.strategy';
import { TransportationSearch } from '../src/data/transportation/transportation.search';
import {
  INavitiaJourneyData,
  TransportationModes,
} from '../src/data/transportation/transportation.types';

describe('when processing the Navitia data', () => {
  const navitiaTransportationStrategy = new NavitiaTransportationStrategy();
  const walkingJourney = {
    duration: 634,
    sections: new Array(1),
  };
  const busJourney = {
    duration: 525,
    sections: new Array(3),
  };
  const subwayJourney = {
    duration: 473,
    sections: new Array(4),
  };
  const journeysData: INavitiaJourneyData[] = [
    walkingJourney,
    busJourney,
    subwayJourney,
  ];

  it('should return the walking duration', async () => {
    const { walkingDuration } =
      navitiaTransportationStrategy.processData(journeysData);

    expect(walkingDuration).toBe(634);
  });

  it('should return the fastest public transport duration', async () => {
    const { publicTransportDuration } =
      navitiaTransportationStrategy.processData(journeysData);

    expect(publicTransportDuration).toBe(473);
  });

  it('should return and undefined walking duration if no data is available', async () => {
    const publicTransportJourneysData = [busJourney, subwayJourney];
    const { walkingDuration } = navitiaTransportationStrategy.processData(
      publicTransportJourneysData
    );

    expect(walkingDuration).toBe(undefined);
  });

  it('should return and undefined public transport duration if no data is available', async () => {
    const walkingJourneyData = [walkingJourney];
    const { publicTransportDuration } =
      navitiaTransportationStrategy.processData(walkingJourneyData);

    expect(publicTransportDuration).toBe(undefined);
  });
});
