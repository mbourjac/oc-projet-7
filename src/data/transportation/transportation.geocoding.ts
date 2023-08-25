import { ICoordinates } from './transportation.types';

export interface GeocodingService {
  getAddressCoordinates(address: string): Promise<ICoordinates>;
}

export class MockGeocodingService implements GeocodingService {
  private constructor(
    private geocodingData: {
      addressIdentifier: string;
      addressCoordinates: ICoordinates;
    }[]
  ) {}

  static init(): MockGeocodingService {
    return new MockGeocodingService([]);
  }

  withData(
    geocodingData: {
      addressIdentifier: string;
      addressCoordinates: ICoordinates;
    }[]
  ): MockGeocodingService {
    this.geocodingData = geocodingData;
    return this;
  }

  async getAddressCoordinates(address: string): Promise<ICoordinates> {
    const matchingAddress = this.geocodingData.find(
      ({ addressIdentifier }) => addressIdentifier === address
    );

    if (!matchingAddress) {
      throw new Error(`Address not found: ${address}`);
    }

    return matchingAddress.addressCoordinates;
  }
}

export class DataGouvGeocodingService implements GeocodingService {
  private readonly apiUrl = new URL('https://api-adresse.data.gouv.fr/search/');

  async getAddressCoordinates(address: string): Promise<ICoordinates> {
    this.apiUrl.searchParams.append('q', address);

    try {
      const response = await fetch(this.apiUrl);

      if (!response.ok) {
        throw new Error(
          `Error while fetching coordinates. Status: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      const [addressObject] = data.features;
      const [longitude, latitude] = addressObject.geometry.coordinates;

      return {
        longitude,
        latitude,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        console.error('An unknown error occurred:', error);
        throw new Error(
          'An unknown error occurred while fetching coordinates.'
        );
      }
    }
  }
}
