import {
    CreateTimeField,
    IntegerField,
    PrimaryKeyField,
    StringField,
    UpdateTimeField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';

export class MaterialModel {
    @PrimaryKeyField()
    id: number;

    @StringField()
    name: string;

    @StringField()
    description: string;

    @IntegerField()
    count: number;

    @IntegerField()
    cost: number;

    @CreateTimeField({
        label: 'Создан',
    })
    createTime: string;

    @UpdateTimeField({
        label: 'Обновлен',
    })
    updateTime: string;
}
