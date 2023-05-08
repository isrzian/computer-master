import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import {MailerModule} from '@nestjs-modules/mailer';
import {PugAdapter} from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {INotifierMessageRepository} from '../domain/interfaces/INotifierMessageRepository';
import {NotifierMessageRepository} from './repositories/NotifierMessageRepository';
import {NotifierService} from '../domain/services/NotifierService';
import {StoreProvider} from '../domain/providers/StoreProvider';
import {MailProvider} from '../domain/providers/MailProvider';
import {SmsRuSmsProvider} from '../domain/providers/SmsRuSmsProvider';
import {IMailService} from '../domain/interfaces/IMailService';
import MailService from './services/MailService';
import NotifierStoreService from '../domain/services/NotifierStoreService';
import {SmsRuCallProvider} from '../domain/providers/SmsRuCallProvider';
import {SmscCallProvider} from '../domain/providers/SmscCallProvider';
import {SmscSmsProvider} from '../domain/providers/SmscSmsProvider';
import {SmscVoiceMessageProvider} from '../domain/providers/SmscVoiceMessageProvider';

const mailPort = process.env.MAIL_PORT;
const mailProtocol = process.env.MAIL_PROTOCOL;
const mailHost = process.env.MAIL_HOST;
const mailUser = process.env.MAIL_USER;

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature(ModuleHelper.importDir(`${__dirname}/tables`)),
        MailerModule.forRoot({
            transport: `${mailProtocol}://${mailUser}@${mailHost}:${mailPort}`,
            defaults: {
                from: '"nest-modules" <modules@nestjs.com>',
            },
            template: {
                dir: `${__dirname}/templates`,
                adapter: new PugAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [
        {
            provide: INotifierMessageRepository,
            useClass: NotifierMessageRepository,
        },
        {
            provide: IMailService,
            useClass: MailService,
        },
        ModuleHelper.provide(NotifierStoreService, [
            INotifierMessageRepository,
        ]),
        ModuleHelper.provide(StoreProvider, [
            NotifierStoreService,
        ]),
        ModuleHelper.provide(SmsRuCallProvider, [
            ConfigService,
        ]),
        ModuleHelper.provide(SmsRuSmsProvider, [
            ConfigService,
        ]),
        ModuleHelper.provide(SmscCallProvider, [
            ConfigService,
        ]),
        ModuleHelper.provide(SmscVoiceMessageProvider, [
            ConfigService,
        ]),
        ModuleHelper.provide(SmscSmsProvider, [
            ConfigService,
        ]),
        ModuleHelper.provide(MailProvider, [
            IMailService,
        ]),
        ModuleHelper.provide(NotifierService, [
            StoreProvider,
            MailProvider,
            SmsRuSmsProvider,
            SmsRuCallProvider,
            SmscSmsProvider,
            SmscCallProvider,
            SmscVoiceMessageProvider,
        ]),
    ],
    exports: [
        NotifierService,
    ],
})
export class NotifierModule {
}
