import {INotifierBaseOptions} from './INotifierSendOptions';

export interface INotifierProvider {
    type: string;
    name: string;
    send: (options: INotifierBaseOptions) => Promise<string|void>;
}
