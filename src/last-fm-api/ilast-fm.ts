import { GetRecentTracksPayload, RecentTrack } from '@domain/entities';

import { IAuthorizationProvider } from './authorization-provider/iauthorization-provider';

export interface ILastFM {
	readonly authorizationProvider: IAuthorizationProvider;

	isAuthorized(): boolean;
	getUsername(): string | null;
	getRecentTracks(payload: GetRecentTracksPayload): Promise<RecentTrack[]>;
}
