import { Point } from '../value-objects/Point';
import { Size } from '../value-objects/Size';
import { Rotation } from '../value-objects/Rotation';
import { ObjectType } from '../types/ObjectType';
import { Terminal } from './Terminal';

export interface GraphicObjectProperties {
  ratedCurrent?: string;
  voltage?: string;
  power?: string;
  manufacturer?: string;
  model?: string;
  description?: string;
}

export class GraphicObject {
  constructor(
    public readonly id: string,
    public readonly type: ObjectType,
    public readonly designation: string,
    public readonly position: Point,
    public readonly size: Size,
    public readonly rotation: Rotation = new Rotation(0),
    public readonly terminals: Terminal[] = [],
    public readonly properties: GraphicObjectProperties = {}
  ) {}

  moveTo(position: Point): GraphicObject {
    return new GraphicObject(
      this.id,
      this.type,
      this.designation,
      position,
      this.size,
      this.rotation,
      this.terminals,
      this.properties
    );
  }

  rotate(): GraphicObject {
    return new GraphicObject(
      this.id,
      this.type,
      this.designation,
      this.position,
      this.size,
      this.rotation.rotateClockwise(),
      this.terminals,
      this.properties
    );
  }

  updateDesignation(designation: string): GraphicObject {
    return new GraphicObject(
      this.id,
      this.type,
      designation,
      this.position,
      this.size,
      this.rotation,
      this.terminals,
      this.properties
    );
  }

  updateProperties(properties: Partial<GraphicObjectProperties>): GraphicObject {
    return new GraphicObject(
      this.id,
      this.type,
      this.designation,
      this.position,
      this.size,
      this.rotation,
      this.terminals,
      { ...this.properties, ...properties }
    );
  }

  getTerminalAbsolutePosition(terminalId: string): Point | null {
    const terminal = this.terminals.find((t) => t.id === terminalId);
    if (!terminal) return null;
    return this.position.add(terminal.offset);
  }
}
