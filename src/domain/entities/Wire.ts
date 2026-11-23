import { Point } from '../value-objects/Point';
import { WireColor } from '../value-objects/WireColor';
import { WireGauge } from '../value-objects/WireGauge';
import { WireType } from '../types/WireType';

export class Wire {
  constructor(
    public readonly id: string,
    public readonly fromObjectId: string,
    public readonly fromTerminalId: string,
    public readonly toObjectId: string,
    public readonly toTerminalId: string,
    public readonly points: Point[] = [],
    public readonly wireType: WireType = WireType.POWER,
    public readonly color: WireColor = WireColor.L1_BROWN,
    public readonly gauge: WireGauge = new WireGauge(1.5),
    public readonly label: string = ''
  ) {}

  withPoints(points: Point[]): Wire {
    return new Wire(
      this.id,
      this.fromObjectId,
      this.fromTerminalId,
      this.toObjectId,
      this.toTerminalId,
      points,
      this.wireType,
      this.color,
      this.gauge,
      this.label
    );
  }
}
