import { ICoordinates, IJourney } from './transportation.types';

export class Journey {
  constructor(readonly journey: IJourney) {}

  async getOriginCoordinates(): Promise<ICoordinates> {
    const originDetails = await this.journey.origin.details;
    return originDetails.coordinates;
  }

  async getDestinationCoordinates(): Promise<ICoordinates> {
    const destinationDetails = await this.journey.destination.details;
    return destinationDetails.coordinates;
  }

  async getDistanceInKm(): Promise<number> {
    const degreesToRadians = (degrees: number): number => {
      return degrees * (Math.PI / 180);
    };

    const { latitude: originLatitude, longitude: originLongitude } =
      await this.getOriginCoordinates();
    const { latitude: destinationLatitude, longitude: destinationLongitude } =
      await this.getDestinationCoordinates();

    const earthRadiusInKm = 6371;
    const dLat = degreesToRadians(destinationLatitude - originLatitude);
    const dLon = degreesToRadians(destinationLongitude - originLongitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(originLatitude)) *
        Math.cos(degreesToRadians(destinationLatitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = earthRadiusInKm * c;

    return distanceInKm;
  }
}
