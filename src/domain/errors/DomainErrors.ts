export class ProjectNotFoundError extends Error {
  constructor(projectId: string) {
    super(`Проект с ID "${projectId}" не найден`);
    this.name = 'ProjectNotFoundError';
  }
}

export class SchemeNotFoundError extends Error {
  constructor(schemeId: string) {
    super(`Схема с ID "${schemeId}" не найдена`);
    this.name = 'SchemeNotFoundError';
  }
}

export class ObjectNotFoundError extends Error {
  constructor(objectId: string) {
    super(`Объект с ID "${objectId}" не найден`);
    this.name = 'ObjectNotFoundError';
  }
}
