import { Point } from '../value-objects/Point';

export type TerminalPolarity = 'LINE' | 'NEUTRAL' | 'GROUND' | 'CONTROL' | 'ANY';

export class Terminal {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly offset: Point,
    public readonly polarity: TerminalPolarity = 'ANY'
  ) {}
}
