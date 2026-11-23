import { Scheme } from '@/domain/entities/Scheme';
import { Wire } from '@/domain/entities/Wire';
import { WireConnectedEvent } from '@/domain/events/WireConnectedEvent';
import { WireRoutingService } from '@/domain/services/WireRoutingService';
import { WireType } from '@/domain/types/WireType';
import { WireColor } from '@/domain/value-objects/WireColor';
import { WireGauge } from '@/domain/value-objects/WireGauge';
import { IEventBus } from '@/application/ports/IEventBus';

export interface DrawWireCommand {
  scheme: Scheme;
  fromObjectId: string;
  fromTerminalId: string;
  toObjectId: string;
  toTerminalId: string;
  wireType?: WireType;
  color?: WireColor;
}

export class DrawWireUseCase {
  constructor(
    private readonly routingService: WireRoutingService,
    private readonly eventBus: IEventBus
  ) {}

  execute(command: DrawWireCommand): Scheme {
    const fromObj = command.scheme.objects.find((o) => o.id === command.fromObjectId);
    const toObj = command.scheme.objects.find((o) => o.id === command.toObjectId);

    const start = fromObj?.getTerminalAbsolutePosition(command.fromTerminalId);
    const end = toObj?.getTerminalAbsolutePosition(command.toTerminalId);

    if (!start || !end) {
      return command.scheme;
    }

    const points = this.routingService.routeOrthogonal(start, end);
    const wire = new Wire(
      `wire-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      command.fromObjectId,
      command.fromTerminalId,
      command.toObjectId,
      command.toTerminalId,
      points,
      command.wireType ?? WireType.POWER,
      command.color ?? WireColor.L1_BROWN,
      new WireGauge(1.5)
    );

    const updatedScheme = command.scheme.addWire(wire);
    this.eventBus.emit(new WireConnectedEvent({ schemeId: command.scheme.id, wire }));
    return updatedScheme;
  }
}
