import { Address } from './transportation.address';
import { TransportationStrategy } from './transportation.strategy';
import { ICoordinates, IDuration } from './transportation.types';

export class TransportationSearch {
  constructor(private strategy?: TransportationStrategy) {}

  public setStrategy(strategy: TransportationStrategy) {
    this.strategy = strategy;
  }

  public async displayDuration(origin: Address, destination: Address) {
    const { hours } = await this.findDurationInHours(origin, destination);
    const convertedDuration = this.convertToHoursAndMinutes(hours);

    return this.formatDurationToString(convertedDuration);
  }

  public async displayFastestDuration(
    origin: Address,
    destination: Address,
    strategies: Record<string, TransportationStrategy>
  ) {
    const { hours, mode } = await this.findFastestDuration(
      origin,
      destination,
      strategies
    );
    const convertedDuration = this.convertToHoursAndMinutes(hours);
    const formattedStringDuration =
      this.formatDurationToString(convertedDuration);

    return `${mode} : ${formattedStringDuration}`;
  }

  private async findDurationInHours(
    origin: Address,
    destination: Address
  ): Promise<IDuration> {
    if (!this.strategy) {
      throw new Error('Please provide a transportation strategy.');
    }

    const originLocation = await origin.details;
    const destinationLocation = await destination.details;
    const distanceInKm = this.calculateDistanceInKm(
      originLocation.coordinates,
      destinationLocation.coordinates
    );
    const duration = await this.strategy.findDuration({
      origin: originLocation,
      destination: destinationLocation,
      distanceInKm,
    });

    return duration;
  }

  private async findFastestDuration(
    origin: Address,
    destination: Address,
    strategies: Record<string, TransportationStrategy>
  ): Promise<IDuration> {
    let fastestDuration = Infinity;
    let fastestMode: string = '';

    for (const strategyKey in strategies) {
      const strategy = strategies[strategyKey];

      this.setStrategy(strategy);

      const { hours: durationInHours, mode } = await this.findDurationInHours(
        origin,
        destination
      );

      if (durationInHours < fastestDuration) {
        fastestDuration = durationInHours;
        fastestMode = mode;
      }
    }

    return { hours: fastestDuration, mode: fastestMode };
  }

  private calculateDistanceInKm = (
    coordinates1: ICoordinates,
    coordinates2: ICoordinates
  ): number => {
    const degreesToRadians = (degrees: number): number => {
      return degrees * (Math.PI / 180);
    };

    const { latitude: lat1, longitude: lon1 } = coordinates1;
    const { latitude: lat2, longitude: lon2 } = coordinates2;

    const earthRadiusInKm = 6371;
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = earthRadiusInKm * c;

    return distanceInKm;
  };

  private convertToHoursAndMinutes(durationInHours: number): {
    hours: number;
    minutes: number;
  } {
    if (durationInHours < 1) {
      const minutes = Math.round(durationInHours * 60);

      return { hours: 0, minutes: minutes || 1 };
    }

    const hours = Math.floor(durationInHours);
    const minutes = Math.round((durationInHours - hours) * 60);

    return { hours, minutes };
  }

  private formatDurationToString(duration: {
    hours: number;
    minutes: number;
  }): string {
    const { hours, minutes } = duration;
    const formattedHours = `${hours} heure${hours === 1 ? '' : 's'}`;
    const formattedMinutes = `${minutes} minute${minutes === 1 ? '' : 's'}`;

    if (hours === 0) {
      return formattedMinutes;
    }

    if (minutes === 0) {
      return formattedHours;
    }

    return `${formattedHours} et ${formattedMinutes}`;
  }
}
