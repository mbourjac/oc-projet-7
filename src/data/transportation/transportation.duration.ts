export class Duration {
  constructor(readonly seconds: number) {}

  getFormattedDuration(): string {
    const { hours, minutes } = this.convertToHoursAndMinutes();
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

  private convertToHoursAndMinutes(): {
    hours: number;
    minutes: number;
  } {
    if (this.seconds < 60) {
      return { hours: 0, minutes: 1 };
    }

    const totalMinutes = Math.ceil(this.seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
  }
}
