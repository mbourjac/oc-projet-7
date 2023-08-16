import { Address } from './transportation.address';
import { Duration } from './transportation.duration';
import { TransportationMode } from './transportation.mode';
import { TransportationStrategy } from './transportation.strategy';
import type {
  TransportationModes,
  ITransportation,
} from './transportation.types';
import { IDuration, ISearchResult } from './transportation.types';

export class TransportationSearch {
  constructor(private strategy?: TransportationStrategy) {}

  public setStrategy(strategy: TransportationStrategy) {
    this.strategy = strategy;
  }

  public async displaySearchResult(
    origin: Address,
    destination: Address
  ): Promise<ISearchResult> {
    if (!this.strategy) {
      throw new Error('Please provide a transportation strategy.');
    }

    try {
      const transportation = await this.strategy.findTransportation(
        origin,
        destination
      );
      const { mode, seconds } = this.findFastestDuration(transportation);
      const duration = new Duration(seconds);
      const transportationMode = new TransportationMode(mode);

      return {
        success: true,
        result: `${transportationMode.getFormattedMode()} : ${duration.getFormattedDuration()}`,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        result: 'Une erreur est survenue.',
      };
    }
  }

  private findFastestDuration(transportation: ITransportation): IDuration {
    let fastestDuration = Infinity;
    let fastestMode: TransportationModes | null = null;
    let mode: keyof typeof transportation;

    for (mode in transportation) {
      const duration = transportation[mode];

      if (duration !== undefined && duration < fastestDuration) {
        fastestDuration = duration;
        fastestMode = mode;
      }
    }

    if (fastestMode === null) {
      throw new Error('No valid transportation mode found.');
    }

    return { mode: fastestMode, seconds: fastestDuration };
  }
}
