import { UnixTimestamp } from '@utils/entities';

export interface GetRecentTracksPayload {
	username: string;
	trackLimit?: number;
	page?: number;
	since?: UnixTimestamp;
	till?: UnixTimestamp;
	extendedData?: boolean;
}

export interface GetAlbumInfoPayload {
	artist: string;
	album: string;
	shouldAutoCorrect?: boolean;
	username?: string;
	language?: string;
}

export interface ScrobbleTrackPayload {
	artistName: string;
	trackTitle: string;
	timestamp: number;
	albumTitle?: string;
}

export interface ScrobbleResult {
	isSuccessful: boolean;
}

export interface AlbumInfo {
	id: string;
	title: string;
	artist: string;
	tracks: AlbumTrack[];
}

export interface AlbumTrack {
	number: number;
	title: string;
	artistName: string;
	albumTitle: string;
}

export interface RecentTrack {
	id: string;
	title: string;
	artist: string;
	scrobbleDate: string;
	url: string;
	image: MediaImage[];
	albumTitle?: string;
}

export interface MediaImage {
	size: TrackImageSize;
	url: string;
}

export const enum TrackImageSize {
	Small = 'S',
	Medium = 'M',
	Large = 'L',
	ExtraLarge = 'XL',
	Mega = 'MEGA',
}
