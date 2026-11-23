import { Project } from '@/domain/entities/Project';
import { Panel } from '@/domain/entities/Panel';
import { Scheme } from '@/domain/entities/Scheme';
import { GraphicObject } from '@/domain/entities/GraphicObject';
import { ElectricalGraph } from '@/domain/entities/ElectricalGraph';
import { Wire } from '@/domain/entities/Wire';
import { Terminal } from '@/domain/entities/Terminal';
import { Point } from '@/domain/value-objects/Point';
import { Size } from '@/domain/value-objects/Size';
import { Rotation } from '@/domain/value-objects/Rotation';
import { WireGauge } from '@/domain/value-objects/WireGauge';

export class ProjectSerializer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJSON(raw: any): Project {
    const panels = (raw.panels ?? []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (p: any) =>
        new Panel(
          p.id,
          p.projectId,
          p.name,
          (p.schemes ?? []).map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (s: any) =>
              new Scheme(
                s.id,
                s.panelId,
                s.name,
                s.format,
                s.orientation,
                (s.objects ?? []).map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (o: any) =>
                    new GraphicObject(
                      o.id,
                      o.type,
                      o.designation,
                      new Point(o.position.x, o.position.y),
                      new Size(o.size.width, o.size.height),
                      new Rotation(o.rotation?.angle ?? 0),
                      (o.terminals ?? []).map(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (t: any) =>
                          new Terminal(t.id, t.name, new Point(t.offset.x, t.offset.y), t.polarity)
                      ),
                      o.properties ?? {}
                    )
                ),
                new ElectricalGraph(
                  (s.electricalGraph?.wires ?? []).map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (w: any) =>
                      new Wire(
                        w.id,
                        w.fromObjectId,
                        w.fromTerminalId,
                        w.toObjectId,
                        w.toTerminalId,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (w.points ?? []).map((pt: any) => new Point(pt.x, pt.y)),
                        w.wireType,
                        w.color,
                        new WireGauge(w.gauge?.mm2 ?? 1.5),
                        w.label ?? ''
                      )
                  )
                ),
                s.revision ?? 1
              )
          )
        )
    );

    return new Project(raw.id, raw.name, raw.description ?? '', panels, raw.updatedAt);
  }
}
