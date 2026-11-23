import { Wire } from './Wire';

export class ElectricalGraph {
  constructor(public readonly wires: Wire[] = []) {}

  addWire(wire: Wire): ElectricalGraph {
    return new ElectricalGraph([...this.wires, wire]);
  }

  removeWire(wireId: string): ElectricalGraph {
    return new ElectricalGraph(this.wires.filter((w) => w.id !== wireId));
  }

  removeObjectWires(objectId: string): ElectricalGraph {
    return new ElectricalGraph(
      this.wires.filter((w) => w.fromObjectId !== objectId && w.toObjectId !== objectId)
    );
  }

  getWiresForObject(objectId: string): Wire[] {
    return this.wires.filter((w) => w.fromObjectId === objectId || w.toObjectId === objectId);
  }
}
