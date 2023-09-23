import { UnixTimestamp } from '@utils/entities';

export interface LastFMSession {
	session: {
		name: string;
		key: string;
		subscriber: number;
	}
}

export interface LastFMUserGetRecentTracksPayload {
	user: string;

	/**
	 * Default: 50
	 * Maximum: 200
	 */
	limit?: number;

	/**
	 * Default: 1;
	 */
	page?: number;

	from?: UnixTimestamp;
	to?: UnixTimestamp;

	extended?: 0 | 1;
}

export interface LastFMRecentTracks {
	recenttracks: {
		'@attr': {
			page: string;
			perPage: string;
			total: string;
			totalPages: string;
			user: string;
		};
		track: LastFMRecentTrack[];
	}
}

export interface LastFMRecentTrack {
	album: {
		'#text': string;
		mbid: string;
	};
	artist: {
		'#text': string;
		mbid: string;
	};
	date: {
		'#text': string;
		uts: string;
	};
	image: LastFMImage[]
	mbid: string;
	name: string;
	streamable: string;
	url: string;
}

export interface LastFMImage {
	/**
	 * URL to the image
	 */
	'#text': string;
	size: LastFMImageSize;
}

export const enum LastFMImageSize {
	Small = 'small',
	Medium = 'medium',
	Large = 'large',
	ExtraLarge = 'extralarge',
}
