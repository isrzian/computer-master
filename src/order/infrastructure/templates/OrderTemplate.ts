import * as path from 'path';
import * as getStream from 'get-stream';
import {OrderModel} from '../../domain/models/OrderModel';

export class OrderTemplate {
    private assetsPath = path.resolve(__dirname, '../../../../public/reports/assets');

    private fontPath = path.join(this.assetsPath, '/fonts/times-new-roman-cyr.ttf');

    public async generate(data: OrderModel) {
        const PDFDocument = require('pdfkit');

        const doc = new PDFDocument();

        doc
            .fill('#000')
            .font(this.fontPath)
            .text(`ЛИСТ ЗАКАЗА #${data.id}`, 250, 80)
            .text(`ФИО: ${data.client.initials}`, 20, 100)
            .text(`Модель телефона: ${data.phoneModel}`, 20, 120)
            .text(`Цвет телефона: ${data.phoneColor}`, 20, 140)
            .text(`Внешний вид телефона: ${data.phoneView}`, 20, 160)
            .text(`ИМЕИ: ${data.imei}`, 20, 180)
            .text(`Дата создания: ${data.createTime}`, 20, 200)
            .text('___________________ (подпись, ФИО)', 20, 250);

        doc.end();

        return getStream.buffer(doc);
    }
}
