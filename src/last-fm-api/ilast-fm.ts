import { IAuthorizationProvider } from './authorization-provider/iauthorization-provider';

export interface ILastFM {
	readonly authorizationProvider: IAuthorizationProvider;
}
