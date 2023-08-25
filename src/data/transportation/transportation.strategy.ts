import { Address } from './transportation.address';
import { Journey } from './transportation.journey';
import type {
  INavitiaJourneyData,
  ITransportation,
  TransportationModes,
} from './transportation.types';

export interface TransportationStrategy {
  findTransportation(
    origin: Address,
    destination: Address
  ): Promise<ITransportation>;
}

export class MockTransportationStrategy implements TransportationStrategy {
  private constructor(private result: ITransportation | null) {}

  static init(): MockTransportationStrategy {
    return new MockTransportationStrategy(null);
  }

  public withResult(result: ITransportation): MockTransportationStrategy {
    this.result = result;
    return this;
  }

  public async findTransportation(origin: Address, destination: Address) {
    if (!this.result) {
      throw new Error(
        `No result found for transportation from '${origin.fullAddress}' to '${destination.fullAddress}'`
      );
    }

    return this.result;
  }
}

export class DefaultTransportationStrategy implements TransportationStrategy {
  async findTransportation(origin: Address, destination: Address) {
    const journey = new Journey({ origin, destination });
    const distanceInKm = await journey.getDistanceInKm();

    return new Map<TransportationModes, number>([
      ['walking', this.walkingDurationInSeconds(distanceInKm)],
      ['bike', this.bikeDurationInSeconds(distanceInKm)],
      ['publicTransport', this.busDurationInSeconds(distanceInKm)],
    ]);
  }

  private walkingDurationInSeconds(distanceInKm: number): number {
    const averageSpeedInKmH = 5;
    const trafficFactor = 1.1;
    const durationInHours = (distanceInKm / averageSpeedInKmH) * trafficFactor;

    return this.toSeconds(durationInHours);
  }

  private bikeDurationInSeconds(distanceInKm: number): number {
    const averageSpeedInKmH = 15;
    const trafficFactor = 1.2;
    const parkingDuration = 3 / 60;
    const durationInHours =
      (distanceInKm / averageSpeedInKmH) * trafficFactor + parkingDuration;

    return this.toSeconds(durationInHours);
  }

  private busDurationInSeconds(distanceInKm: number): number {
    const averageSpeedInKmH = 10;
    const trafficFactor = 1.3;
    const waitingDuration = 7 / 60;
    const durationInHours =
      (distanceInKm / averageSpeedInKmH) * trafficFactor + waitingDuration;

    return this.toSeconds(durationInHours);
  }

  private toSeconds(hours: number): number {
    return Math.floor(hours * 3600);
  }
}

export class NavitiaTransportationStrategy implements TransportationStrategy {
  async findTransportation(
    origin: Address,
    destination: Address
  ): Promise<ITransportation> {
    const rawData = await this.fetchData(origin, destination);
    const { walkingDuration, publicTransportDuration } =
      this.processData(rawData);
    const transportation = new Map<TransportationModes, number>();

    if (walkingDuration !== undefined) {
      transportation.set('walking', walkingDuration);
    }

    if (publicTransportDuration !== undefined) {
      transportation.set('publicTransport', publicTransportDuration);
    }

    return transportation;
  }

  async fetchData(
    origin: Address,
    destination: Address
  ): Promise<INavitiaJourneyData[]> {
    try {
      const originCoordinates = await origin.coordinates;
      const destinationCoordinates = await destination.coordinates;
      const nowDate = new Date();
      const departureTime = nowDate.toISOString();
      const url = `http://localhost:5000/navitia?originLongitude=${originCoordinates.longitude}&originLatitude=${originCoordinates.latitude}&destinationLongitude=${destinationCoordinates.longitude}&destinationLatitude=${destinationCoordinates.latitude}&departureTime=${departureTime}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Error while fetching transportation. Status: ${response.status} - ${response.statusText}`
        );
      }

      const data: INavitiaJourneyData[] = await response.json();

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        console.error('An unknown error occurred:', error);
        throw new Error(
          'An unknown error occurred while fetching transporation.'
        );
      }
    }
  }

  processData(rawData: INavitiaJourneyData[]): {
    walkingDuration?: number;
    publicTransportDuration?: number;
  } {
    const journeys = rawData.map(({ duration, sections }) => ({
      duration,
      sections,
    }));
    const walkingJourney = journeys.find(
      ({ sections }) => sections.length === 1
    );
    const publicTransportJourneys = journeys.filter(
      ({ sections }) => sections.length > 1
    );
    const fastestPublicTransportJourney = publicTransportJourneys.length
      ? publicTransportJourneys.reduce((a, b) =>
          a.duration < b.duration ? a : b
        )
      : undefined;

    return {
      walkingDuration: walkingJourney?.duration,
      publicTransportDuration: fastestPublicTransportJourney?.duration,
    };
  }
}
