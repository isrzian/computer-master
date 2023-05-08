import {INotifierBaseOptions, INotifierMailOptions} from '../interfaces/INotifierSendOptions';
import NotifierProviderType from '../enums/NotifierProviderType';
import {INotifierProvider} from '../interfaces/INotifierProvider';
import {IMailService} from '../interfaces/IMailService';

export class MailProvider implements INotifierProvider {
    public type = NotifierProviderType.MAIL;

    public name = 'mail';

    constructor(
        /** @see MailService **/
        private mailService: IMailService,
    ) {
    }

    async send(options: INotifierMailOptions & INotifierBaseOptions) {
        this.mailService.sendEmail(options.fromEmail, options.toEmail, options.message, options.attachments);
    }
}
