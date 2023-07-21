import { ILocation } from './transportation.types';

export interface GeocodingService {
  getAddressDetails(address: string): Promise<ILocation>;
}

export class DataGouvGeocodingService implements GeocodingService {
  private readonly apiUrl = new URL('https://api-adresse.data.gouv.fr/search/');

  async getAddressDetails(address: string): Promise<ILocation> {
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
      const { housenumber, street, postcode, city } = addressObject.properties;

      return {
        address: {
          number: housenumber,
          street,
          postcode,
          city,
        },
        coordinates: {
          longitude,
          latitude,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error while fetching coordinates: ${error.message}`);
      } else {
        console.error('Unknown error occurred:', error);
        throw new Error(
          'An unknown error occurred while fetching coordinates.'
        );
      }
    }
  }
}
