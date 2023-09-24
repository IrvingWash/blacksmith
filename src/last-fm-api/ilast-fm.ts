import {
	AlbumInfo,
	GetAlbumInfoPayload,
	GetRecentTracksPayload,
	RecentTrack,
	ScrobbleResult,
	ScrobbleTrackPayload,
} from '@domain/entities';

import { IAuthorizationProvider } from './authorization-provider/iauthorization-provider';

export interface ILastFM {
	readonly authorizationProvider: IAuthorizationProvider;

	isAuthorized(): boolean;
	getUsername(): string | null;
	getRecentTracks(payload: GetRecentTracksPayload): Promise<RecentTrack[]>;
	getAlbumInfo(payload: GetAlbumInfoPayload): Promise<AlbumInfo>;

	scrobbleTrack(payload: ScrobbleTrackPayload): Promise<ScrobbleResult>;
}
