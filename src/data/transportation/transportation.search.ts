import { Address } from './transportation.address';
import { Duration } from './transportation.duration';
import { TransportationMode } from './transportation.mode';
import { TransportationStrategy } from './transportation.strategy';
import type {
  ITransportation,
  TransportationModes,
} from './transportation.types';
import type { ISearchResult } from './transportation.types';

export class TransportationSearch {
  constructor(private strategies?: TransportationStrategy[]) {}

  public setStrategies(strategies: TransportationStrategy[]) {
    this.strategies = strategies;
  }

  public async displaySearchResult(
    origin: Address,
    destination: Address
  ): Promise<ISearchResult> {
    if (!this.strategies) {
      throw new Error('Please provide transportation strategies.');
    }

    try {
      const transportationResults = await Promise.all(
        this.strategies.map((strategy) =>
          strategy.findTransportation(origin, destination)
        )
      );

      const transportation = this.findUniqueFastestModes(transportationResults);
      const sortedTransportation: [TransportationModes, number][] = [
        ...transportation.entries(),
      ].sort((a, b) => a[1] - b[1]);

      const result = sortedTransportation.map(([mode, duration]) => {
        const transportationMode = new TransportationMode(mode);
        const transportationDuration = new Duration(duration);

        return `${transportationMode.getFormattedMode()} : ${transportationDuration.getFormattedDuration()}`;
      });

      return {
        status: 'success',
        data: result,
      };
    } catch (error) {
      console.error(error);

      return {
        status: 'error',
        message: 'Une erreur est survenue',
      };
    }
  }

  private findUniqueFastestModes(
    transportationResults: ITransportation[]
  ): ITransportation {
    const uniqueFastestModes: ITransportation = new Map();

    for (const transportationResult of transportationResults) {
      for (const [mode, time] of transportationResult) {
        const currentFastestTime = uniqueFastestModes.get(mode);
        if (currentFastestTime === undefined || time < currentFastestTime) {
          uniqueFastestModes.set(mode, time);
        }
      }
    }

    return uniqueFastestModes;
  }
}
