import { GeocodingService } from './transportation.geocoding';

export class Address {
  constructor(
    readonly address: string,
    private readonly geocodingService: GeocodingService
  ) {}

  get details() {
    return this.geocodingService.getAddressDetails(this.address);
  }
}
