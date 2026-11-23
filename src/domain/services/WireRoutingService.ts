import { Point } from '../value-objects/Point';

export class WireRoutingService {
  /**
   * Computes an orthogonal (Manhattan) path between two points.
   */
  routeOrthogonal(start: Point, end: Point): Point[] {
    if (start.x === end.x || start.y === end.y) {
      return [start, end];
    }

    const midX = Math.round((start.x + end.x) / 2);
    return [start, new Point(midX, start.y), new Point(midX, end.y), end];
  }
}
