import { IDuration, ITrip } from './transportation.types';

export interface TransportationStrategy {
  findDuration(trip: ITrip): Promise<IDuration>;
}

export class MockWalkingStrategy implements TransportationStrategy {
  async findDuration({ distanceInKm }: ITrip): Promise<IDuration> {
    const averageSpeedInKmH = 5;
    const trafficFactor = 1.1;
    const hours = (distanceInKm / averageSpeedInKmH) * trafficFactor;

    return { hours, mode: 'À pied' };
  }
}

export class MockBikingStrategy implements TransportationStrategy {
  async findDuration({ distanceInKm }: ITrip): Promise<IDuration> {
    const averageSpeedInKmH = 15;
    const trafficFactor = 1.2;
    const parkingDuration = (Math.floor(Math.random() * 5) + 1) / 60;
    const hours =
      (distanceInKm / averageSpeedInKmH) * trafficFactor + parkingDuration;

    return { hours, mode: 'À vélo' };
  }
}

export class MockBusStrategy implements TransportationStrategy {
  async findDuration({ distanceInKm }: ITrip): Promise<IDuration> {
    const averageSpeedInKmH = 10;
    const trafficFactor = 1.3;
    const waitingDuration = (Math.floor(Math.random() * 10) + 1) / 60;
    const hours =
      (distanceInKm / averageSpeedInKmH) * trafficFactor + waitingDuration;

    return { hours, mode: 'En bus' };
  }
}
