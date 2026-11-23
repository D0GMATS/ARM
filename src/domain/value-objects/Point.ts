export class Point {
  constructor(
    public readonly x: number,
    public readonly y: number
  ) {}

  add(other: Point): Point {
    return new Point(this.x + other.x, this.y + other.y);
  }

  subtract(other: Point): Point {
    return new Point(this.x - other.x, this.y - other.y);
  }

  distanceTo(other: Point): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.hypot(dx, dy);
  }

  snapToGrid(gridSize: number): Point {
    if (gridSize <= 0) return this;
    return new Point(
      Math.round(this.x / gridSize) * gridSize,
      Math.round(this.y / gridSize) * gridSize
    );
  }

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }
}
