import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {MaterialModel} from '../models/MaterialModel';

export const IMaterialRepository = 'IMaterialRepository';

export type IMaterialRepository = ICrudRepository<MaterialModel>
