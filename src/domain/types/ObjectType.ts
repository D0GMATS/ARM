export enum ObjectType {
  CIRCUIT_BREAKER = 'CIRCUIT_BREAKER',
  RELAY = 'RELAY',
  CONTACTOR = 'CONTACTOR',
  LAMP = 'LAMP',
  MOTOR = 'MOTOR',
  BUSBAR = 'BUSBAR',
  TRANSFORMER = 'TRANSFORMER',
  FUSE = 'FUSE',
  SWITCH = 'SWITCH',
  TERMINAL_BLOCK = 'TERMINAL_BLOCK',
}

export interface ObjectMetadata {
  type: ObjectType;
  label: string;
  defaultPrefix: string;
  category: 'protection' | 'switching' | 'load' | 'distribution' | 'indication';
  defaultWidth: number;
  defaultHeight: number;
}
