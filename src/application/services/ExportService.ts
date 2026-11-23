import { Scheme } from '@/domain/entities/Scheme';
import { FORMAT_DIMENSIONS } from '@/domain/types/SchemeFormat';

export class ExportService {
  exportToJSON(scheme: Scheme): string {
    return JSON.stringify(scheme, null, 2);
  }

  exportToSVG(scheme: Scheme): string {
    const dims = FORMAT_DIMENSIONS[scheme.format];
    const objectsSvg = scheme.objects
      .map(
        (obj) =>
          `<g transform="translate(${obj.position.x}, ${obj.position.y})">
            <rect width="${obj.size.width}" height="${obj.size.height}" fill="#ffffff" stroke="#34495E" stroke-width="2" rx="4" />
            <text x="${obj.size.width / 2}" y="${obj.size.height / 2}" text-anchor="middle" dominant-baseline="middle" font-family="Open Sans, sans-serif" font-size="12" fill="#34495E">${obj.designation}</text>
          </g>`
      )
      .join('\n  ');

    const wiresSvg = scheme.electricalGraph.wires
      .map((wire) => {
        const pts = wire.points.map((p) => `${p.x},${p.y}`).join(' ');
        return `<polyline points="${pts}" fill="none" stroke="${wire.color}" stroke-width="2" />`;
      })
      .join('\n  ');

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${dims.width}" height="${dims.height}" viewBox="0 0 ${dims.width} ${dims.height}">
  <rect width="100%" height="100%" fill="#ffffff" />
  ${wiresSvg}
  ${objectsSvg}
</svg>`;
  }

  exportToPNG(scheme: Scheme): void {
    const svg = this.exportToSVG(scheme);
    const dims = FORMAT_DIMENSIONS[scheme.format];
    const img = new Image();
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = dims.width;
      canvas.height = dims.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = pngUrl;
            a.download = `${scheme.name}.png`;
            a.click();
            URL.revokeObjectURL(pngUrl);
          }
        }, 'image/png');
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  exportToPDF(): void {
    window.print();
  }

  downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
