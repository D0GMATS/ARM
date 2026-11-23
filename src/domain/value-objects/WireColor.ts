export enum WireColor {
  L1_BROWN = '#8B4513',
  L2_BLACK = '#1C1C1C',
  L3_GRAY = '#7F8C8D',
  N_BLUE = '#2980B9',
  PE_GREEN_YELLOW = '#27AE60',
  CONTROL_RED = '#E74C3C',
}

export const WIRE_COLOR_LABELS: Record<WireColor, string> = {
  [WireColor.L1_BROWN]: 'L1 (Коричневый)',
  [WireColor.L2_BLACK]: 'L2 (Черный)',
  [WireColor.L3_GRAY]: 'L3 (Серый)',
  [WireColor.N_BLUE]: 'N (Синий)',
  [WireColor.PE_GREEN_YELLOW]: 'PE (Желто-зеленый)',
  [WireColor.CONTROL_RED]: 'Управление (Красный)',
};
