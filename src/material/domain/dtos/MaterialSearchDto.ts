import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {MaterialModel} from '../models/MaterialModel';

export class MaterialSearchDto {
    @ExtendField(MaterialModel)
    name: string;
}
