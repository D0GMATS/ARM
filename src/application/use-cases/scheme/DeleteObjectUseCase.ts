import { Scheme } from '@/domain/entities/Scheme';

export class DeleteObjectUseCase {
  execute(scheme: Scheme, objectId: string): Scheme {
    return scheme.removeObject(objectId);
  }
}
