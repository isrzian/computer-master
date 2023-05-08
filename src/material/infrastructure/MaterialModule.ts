import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import {MaterialTable} from './tables/MaterialTable';
import {IMaterialRepository} from '../domain/interfaces/IMaterialRepository';
import {MaterialRepository} from './repositories/MaterialRepository';
import {MaterialService} from '../domain/services/MaterialService';

@Module({
    imports: [
        TypeOrmModule.forFeature([MaterialTable]),
    ],
    providers: [
        {
            provide: IMaterialRepository,
            useClass: MaterialRepository,
        },
        ModuleHelper.provide(MaterialService, [
            IMaterialRepository,
        ]),
    ],
    exports: [
        MaterialService,
        IMaterialRepository,
    ],
})
export class MaterialModule {
}
