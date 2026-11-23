import { GraphicObject } from './GraphicObject';
import { ElectricalGraph } from './ElectricalGraph';
import { Wire } from './Wire';
import { Point } from '../value-objects/Point';
import { Orientation, SchemeFormat } from '../types/SchemeFormat';

export class Scheme {
  constructor(
    public readonly id: string,
    public readonly panelId: string,
    public readonly name: string,
    public readonly format: SchemeFormat = SchemeFormat.A4,
    public readonly orientation: Orientation = Orientation.Landscape,
    public readonly objects: GraphicObject[] = [],
    public readonly electricalGraph: ElectricalGraph = new ElectricalGraph(),
    public readonly revision: number = 1
  ) {}

  addObject(object: GraphicObject): Scheme {
    return new Scheme(
      this.id,
      this.panelId,
      this.name,
      this.format,
      this.orientation,
      [...this.objects, object],
      this.electricalGraph,
      this.revision + 1
    );
  }

  moveObject(objectId: string, newPosition: Point): Scheme {
    const newObjects = this.objects.map((obj) =>
      obj.id === objectId ? obj.moveTo(newPosition) : obj
    );
    return new Scheme(
      this.id,
      this.panelId,
      this.name,
      this.format,
      this.orientation,
      newObjects,
      this.electricalGraph,
      this.revision + 1
    );
  }

  updateObject(updated: GraphicObject): Scheme {
    const newObjects = this.objects.map((obj) => (obj.id === updated.id ? updated : obj));
    return new Scheme(
      this.id,
      this.panelId,
      this.name,
      this.format,
      this.orientation,
      newObjects,
      this.electricalGraph,
      this.revision + 1
    );
  }

  removeObject(objectId: string): Scheme {
    const newObjects = this.objects.filter((obj) => obj.id !== objectId);
    const newGraph = this.electricalGraph.removeObjectWires(objectId);
    return new Scheme(
      this.id,
      this.panelId,
      this.name,
      this.format,
      this.orientation,
      newObjects,
      newGraph,
      this.revision + 1
    );
  }

  addWire(wire: Wire): Scheme {
    return new Scheme(
      this.id,
      this.panelId,
      this.name,
      this.format,
      this.orientation,
      this.objects,
      this.electricalGraph.addWire(wire),
      this.revision + 1
    );
  }

  removeWire(wireId: string): Scheme {
    return new Scheme(
      this.id,
      this.panelId,
      this.name,
      this.format,
      this.orientation,
      this.objects,
      this.electricalGraph.removeWire(wireId),
      this.revision + 1
    );
  }

  rename(name: string): Scheme {
    return new Scheme(
      this.id,
      this.panelId,
      name,
      this.format,
      this.orientation,
      this.objects,
      this.electricalGraph,
      this.revision + 1
    );
  }
}
