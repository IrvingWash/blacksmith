import { IAuthorizationProvider } from './authorization-provider/iauthorization-provider';
import { ITransport } from './transport/itransport';

export interface ILastFM {
	readonly authorizationProvider: IAuthorizationProvider;
	readonly transport: ITransport;

	isAuthorized(): boolean;
	getUsername(): string | undefined;
}
