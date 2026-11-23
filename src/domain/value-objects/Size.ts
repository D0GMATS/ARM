export class Size {
  constructor(
    public readonly width: number,
    public readonly height: number
  ) {
    if (width <= 0 || height <= 0) {
      throw new Error('Size dimensions must be positive');
    }
  }

  equals(other: Size): boolean {
    return this.width === other.width && this.height === other.height;
  }
}
