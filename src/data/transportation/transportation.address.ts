import { GeocodingService } from './transportation.geocoding';
import { IAddress, ICoordinates } from './transportation.types';

export class Address {
  private _coordinates?: ICoordinates;

  constructor(
    readonly address: IAddress,
    private readonly geocodingService?: GeocodingService
  ) {}

  get fullAddress() {
    const { number, street, city, postcode } = this.address;

    return `${number ?? ''}${street} ${city} ${postcode ?? ''}`.trim();
  }

  get coordinates(): Promise<ICoordinates> {
    if (this._coordinates) {
      return Promise.resolve(this._coordinates);
    }

    return this.fetchCoordinates();
  }

  private async fetchCoordinates() {
    if (!this.geocodingService) {
      throw new Error('Please provide a geocoding service');
    }

    const coordinates = await this.geocodingService.getAddressCoordinates(
      this.fullAddress
    );

    this._coordinates = coordinates;
    return this._coordinates;
  }
}
