import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {MaterialModel} from '../models/MaterialModel';

export class MaterialSaveDto {
    @ExtendField(MaterialModel)
    name: string;

    @ExtendField(MaterialModel)
    description: string;

    @ExtendField(MaterialModel)
    count: number;

    @ExtendField(MaterialModel)
    cost: number;
}
