import { Address } from './transportation.address';
import { Journey } from './transportation.journey';
import type { ITransportation } from './transportation.types';

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

    return {
      walking: this.walkingDurationInSeconds(distanceInKm),
      bike: this.bikeDurationInSeconds(distanceInKm),
      bus: this.busDurationInSeconds(distanceInKm),
    };
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
