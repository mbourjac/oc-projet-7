import { TransportationModes } from './transportation.types';

export class TransportationMode {
  constructor(readonly mode: TransportationModes) {}

  getFormattedMode(): string {
    switch (this.mode) {
      case 'walking':
        return 'À pied';
      case 'bike':
        return 'À vélo';
      case 'bus':
        return 'En bus';
      default:
        return 'Unknown transportation mode';
    }
  }
}
