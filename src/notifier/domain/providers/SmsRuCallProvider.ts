import axios from 'axios';
import {ConfigService} from '@nestjs/config';
import {INotifierBaseOptions, INotifierCallOptions} from '../interfaces/INotifierSendOptions';
import NotifierProviderType from '../enums/NotifierProviderType';
import {INotifierProvider} from '../interfaces/INotifierProvider';
import NotifierSendException from '../exceptions/NotifierSendException';

export class SmsRuCallProvider implements INotifierProvider {
    public type = NotifierProviderType.CALL;

    public name = 'smsRu';

    constructor(
        public configService: ConfigService,
    ) {
    }

    async send(options: INotifierCallOptions & INotifierBaseOptions) {
        let phone = options.phone;
        phone = phone.replace(/[^0-9]+/, '');
        phone = phone.replace(/^8/, '7');

        if (!this.configService.get('notifier.providers.smsRu.apiId')) {
            throw new Error(
                'Wrong SmsRuCallProvider configuration, please set "notifier.providers.smsRu.apiId" param.',
            );
        }

        let response;
        try {
            response = await axios.get('https://sms.ru/code/call', {
                params: {
                    api_id: this.configService.get('notifier.providers.smsRu.apiId'),
                    phone,
                },
            });
        } catch (e) {
            throw new NotifierSendException(JSON.stringify(e));
        }

        if (response.data.status === 'ERROR') {
            throw new NotifierSendException(response.data.status_text);
        }
        if (!response.data.code) {
            throw new NotifierSendException('SMS.RU, not found code in response: ' + JSON.stringify(response.data));
        }

        return response.data.code;
    }
}
