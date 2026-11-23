export enum SchemeFormat {
  A4 = 'A4',
  A3 = 'A3',
  A2 = 'A2',
  A1 = 'A1',
}

export enum Orientation {
  Landscape = 'landscape',
  Portrait = 'portrait',
}

export const FORMAT_DIMENSIONS: Record<SchemeFormat, { width: number; height: number }> = {
  [SchemeFormat.A4]: { width: 1122, height: 793 },
  [SchemeFormat.A3]: { width: 1587, height: 1122 },
  [SchemeFormat.A2]: { width: 2245, height: 1587 },
  [SchemeFormat.A1]: { width: 3178, height: 2245 },
};
