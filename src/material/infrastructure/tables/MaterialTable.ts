import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {MaterialModel} from '../../domain/models/MaterialModel';

@TableFromModel(MaterialModel, 'material')
export class MaterialTable implements DeepPartial<MaterialModel> {}
