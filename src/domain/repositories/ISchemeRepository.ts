import { Scheme } from '../entities/Scheme';

export const ISchemeRepositoryToken = Symbol('ISchemeRepository');

export interface ISchemeRepository {
  findById(id: string): Promise<Scheme | null>;
  save(scheme: Scheme): Promise<void>;
  delete(id: string): Promise<void>;
}
