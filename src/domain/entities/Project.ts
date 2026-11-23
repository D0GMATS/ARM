import { Panel } from './Panel';
import { Scheme } from './Scheme';

export class Project {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string = '',
    public readonly panels: Panel[] = [],
    public readonly updatedAt: string = new Date().toISOString()
  ) {}

  addPanel(panel: Panel): Project {
    return new Project(
      this.id,
      this.name,
      this.description,
      [...this.panels, panel],
      new Date().toISOString()
    );
  }

  updateScheme(scheme: Scheme): Project {
    const newPanels = this.panels.map((p) =>
      p.id === scheme.panelId ? p.updateScheme(scheme) : p
    );
    return new Project(this.id, this.name, this.description, newPanels, new Date().toISOString());
  }

  findSchemeById(schemeId: string): Scheme | null {
    for (const panel of this.panels) {
      const found = panel.schemes.find((s) => s.id === schemeId);
      if (found) return found;
    }
    return null;
  }
}
