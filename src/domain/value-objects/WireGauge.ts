export type WireGaugeValue = 0.75 | 1.0 | 1.5 | 2.5 | 4.0 | 6.0 | 10.0 | 16.0 | 25.0;

export class WireGauge {
  constructor(public readonly mm2: WireGaugeValue = 1.5) {}

  get maxCurrentAmps(): number {
    const table: Record<WireGaugeValue, number> = {
      0.75: 10,
      1.0: 13,
      1.5: 16,
      2.5: 25,
      4.0: 32,
      6.0: 40,
      10.0: 63,
      16.0: 80,
      25.0: 100,
    };
    return table[this.mm2];
  }

  toString(): string {
    return `${this.mm2} мм²`;
  }
}
