import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {MaterialModel} from '../models/MaterialModel';
import {MaterialSearchDto} from '../dtos/MaterialSearchDto';
import {MaterialSaveDto} from '../dtos/MaterialSaveDto';
import {IMaterialRepository} from '../interfaces/IMaterialRepository';

export class MaterialService extends CrudService<MaterialModel,
    MaterialSearchDto,
    MaterialSaveDto | MaterialModel> {
    protected modelClass = MaterialModel;

    constructor(
        /** @see MaterialRepository */
        public repository: IMaterialRepository,
    ) {
        super();
    }
}
