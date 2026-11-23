import { ObjectMetadata, ObjectType } from '../types/ObjectType';
import { GraphicObject } from '../entities/GraphicObject';
import { Terminal } from '../entities/Terminal';
import { Point } from '../value-objects/Point';
import { Size } from '../value-objects/Size';

export const UGO_CATALOG: ObjectMetadata[] = [
  { type: ObjectType.CIRCUIT_BREAKER, label: 'Автомат (QF)', defaultPrefix: 'QF', category: 'protection', defaultWidth: 60, defaultHeight: 80 },
  { type: ObjectType.FUSE, label: 'Предохранитель (FU)', defaultPrefix: 'FU', category: 'protection', defaultWidth: 50, defaultHeight: 70 },
  { type: ObjectType.CONTACTOR, label: 'Контактор (KM)', defaultPrefix: 'KM', category: 'switching', defaultWidth: 70, defaultHeight: 80 },
  { type: ObjectType.RELAY, label: 'Реле (K)', defaultPrefix: 'K', category: 'switching', defaultWidth: 60, defaultHeight: 70 },
  { type: ObjectType.SWITCH, label: 'Выключатель (SA)', defaultPrefix: 'SA', category: 'switching', defaultWidth: 50, defaultHeight: 60 },
  { type: ObjectType.MOTOR, label: 'Двигатель (M)', defaultPrefix: 'M', category: 'load', defaultWidth: 70, defaultHeight: 70 },
  { type: ObjectType.LAMP, label: 'Лампа (HL)', defaultPrefix: 'HL', category: 'indication', defaultWidth: 50, defaultHeight: 50 },
  { type: ObjectType.TRANSFORMER, label: 'Трансформатор (T)', defaultPrefix: 'T', category: 'distribution', defaultWidth: 70, defaultHeight: 80 },
  { type: ObjectType.BUSBAR, label: 'Шина (L/N/PE)', defaultPrefix: 'L', category: 'distribution', defaultWidth: 160, defaultHeight: 24 },
  { type: ObjectType.TERMINAL_BLOCK, label: 'Клеммник (XT)', defaultPrefix: 'XT', category: 'distribution', defaultWidth: 60, defaultHeight: 40 },
];

export class ObjectCatalogService {
  getCatalog(): ObjectMetadata[] {
    return UGO_CATALOG;
  }

  createDefaultObject(
    id: string,
    type: ObjectType,
    position: Point,
    indexNumber: number
  ): GraphicObject {
    const meta = UGO_CATALOG.find((m) => m.type === type) ?? UGO_CATALOG[0];
    const w = meta.defaultWidth;
    const h = meta.defaultHeight;

    const terminals: Terminal[] =
      type === ObjectType.BUSBAR
        ? [
            new Terminal(`${id}-t1`, '1', new Point(20, h / 2), 'LINE'),
            new Terminal(`${id}-t2`, '2', new Point(w / 2, h / 2), 'LINE'),
            new Terminal(`${id}-t3`, '3', new Point(w - 20, h / 2), 'LINE'),
          ]
        : [
            new Terminal(`${id}-in`, '1', new Point(w / 2, 0), 'ANY'),
            new Terminal(`${id}-out`, '2', new Point(w / 2, h), 'ANY'),
          ];

    return new GraphicObject(
      id,
      type,
      `${meta.defaultPrefix}${indexNumber}`,
      position,
      new Size(w, h),
      undefined,
      terminals,
      { voltage: '230/400V', ratedCurrent: '16A' }
    );
  }
}
