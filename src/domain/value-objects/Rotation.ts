export type RotationAngle = 0 | 90 | 180 | 270;

export class Rotation {
  constructor(public readonly angle: RotationAngle = 0) {}

  rotateClockwise(): Rotation {
    const next = ((this.angle + 90) % 360) as RotationAngle;
    return new Rotation(next);
  }

  rotateCounterClockwise(): Rotation {
    const next = ((this.angle + 270) % 360) as RotationAngle;
    return new Rotation(next);
  }
}
