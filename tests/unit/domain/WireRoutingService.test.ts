import { describe, it, expect } from 'vitest';
import { WireRoutingService } from '@/domain/services/WireRoutingService';
import { Point } from '@/domain/value-objects/Point';

describe('WireRoutingService', () => {
  const service = new WireRoutingService();

  it('returns direct line when aligned horizontally or vertically', () => {
    const pts = service.routeOrthogonal(new Point(0, 0), new Point(100, 0));
    expect(pts).toHaveLength(2);
  });

  it('returns orthogonal 4-point path when diagonal', () => {
    const pts = service.routeOrthogonal(new Point(0, 0), new Point(100, 80));
    expect(pts).toHaveLength(4);
    expect(pts[1].x).toBe(50);
    expect(pts[1].y).toBe(0);
    expect(pts[2].x).toBe(50);
    expect(pts[2].y).toBe(80);
  });
});
