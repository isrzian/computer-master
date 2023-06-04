import BaseEnum from '@steroidsjs/nest/src/domain/base/BaseEnum';

export default class NotifierProviderType extends BaseEnum {
    static MAIL = 'mail';

    static SMS = 'sms';

    static PUSH = 'push';

    static STORE = 'store';

    static CALL = 'call';

    static VOICE = 'voice';

    static getLabels() {
        return {
            [this.MAIL]: 'Электронная почта',
            [this.SMS]: 'СМС сообщение',
            [this.CALL]: 'Звонок',
            [this.PUSH]: 'Push-уведомление',
            [this.STORE]: 'История уведомлений на сайте',
            [this.VOICE]: 'Голосовое сообщение',
        };
    }
}
