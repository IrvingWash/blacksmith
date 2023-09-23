import { IAuthorizationProvider } from './authorization-provider/iauthorization-provider';

export interface ILastFM {
	readonly authorizationProvider: IAuthorizationProvider;
	isAuthorized(): boolean;
	getUsername(): string | undefined;
}
