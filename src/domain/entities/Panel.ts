import { Scheme } from './Scheme';

export class Panel {
  constructor(
    public readonly id: string,
    public readonly projectId: string,
    public readonly name: string,
    public readonly schemes: Scheme[] = []
  ) {}

  addScheme(scheme: Scheme): Panel {
    return new Panel(this.id, this.projectId, this.name, [...this.schemes, scheme]);
  }

  updateScheme(updated: Scheme): Panel {
    return new Panel(
      this.id,
      this.projectId,
      this.name,
      this.schemes.map((s) => (s.id === updated.id ? updated : s))
    );
  }

  removeScheme(schemeId: string): Panel {
    return new Panel(
      this.id,
      this.projectId,
      this.name,
      this.schemes.filter((s) => s.id !== schemeId)
    );
  }
}
