import { UnixTimestamp } from '@utils/entities';

export interface GetRecentTracksPayload {
	username: string;
	trackLimit?: number;
	page?: number;
	since?: UnixTimestamp;
	till?: UnixTimestamp;
	extendedData?: boolean;
}

export interface RecentTrack {
	title: string;
	artist: string;
	scrobbleDate: string;
	url: string;
	image: TrackImage;
	albumTitle?: string;
}

export interface TrackImage {
	size: TrackImageSize;
	url: string;
}

export const enum TrackImageSize {
	Small = 'S',
	Medium = 'M',
	Large = 'L',
	ExtraLarge = 'XL',
}
