import {INotifierMailAttachment} from './INotifierSendOptions';

export const IMailService = 'IMailService';

export interface IMailService {
    sendEmail(fromEmail: string, toEmail:string, message:string, attachments: INotifierMailAttachment[]);
}
