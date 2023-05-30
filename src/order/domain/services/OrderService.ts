import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {DataMapper} from '@steroidsjs/nest/src/usecases/helpers/DataMapper';
import {OrderModel} from '../models/OrderModel';
import {OrderSearchDto} from '../dtos/OrderSearchDto';
import {OrderSaveDto} from '../dtos/OrderSaveDto';
import {IOrderRepository} from '../interfaces/IOrderRepository';
import {OrderTemplate} from '../../infrastructure/templates/OrderTemplate';
import {FileService} from '../../../file/domain/services/FileService';
import {FileStreamSourceDto} from '../../../file/domain/dtos/sources/FileStreamSourceDto';
import {FileModel} from '../../../file/domain/models/FileModel';

export class OrderService extends CrudService<OrderModel,
    OrderSearchDto,
    OrderSaveDto | OrderModel> {
    protected modelClass = OrderModel;

    constructor(
        /** @see OrderRepository */
        public repository: IOrderRepository,
        public fileService: FileService,
    ) {
        super();
    }

    async getReport(data: OrderModel) {
        const template = new OrderTemplate();

        const content = await template.generate(data);

        const fileName = `Заказ-${data.id}.pdf`;

        return this.saveFile(fileName, content);
    }

    private async saveFile(fileName: string, content: Buffer): Promise<FileModel> {
        return this.fileService.upload(
            DataMapper.create<FileStreamSourceDto>(FileStreamSourceDto, {
                fileName,
                fileMimeType: 'application/pdf',
                stream: content,
            }),
        );
    }
}
