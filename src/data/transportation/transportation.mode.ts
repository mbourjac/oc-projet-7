import type { TransportationModes } from './transportation.types';

export class TransportationMode {
  constructor(readonly mode: TransportationModes) {}

  getFormattedMode(): string {
    switch (this.mode) {
      case 'walking':
        return 'À pied';
      case 'bike':
        return 'À vélo';
      case 'publicTransport':
        return 'En transport';
      default:
        return 'Unknown transportation mode';
    }
  }
}
