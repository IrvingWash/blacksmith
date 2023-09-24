import { UnixTimestamp } from '@utils/entities';

export interface LastFMSession {
	session: {
		name: string;
		key: string;
		subscriber: number;
	}
}

export interface LastFMAlbumGetInfoPayload {
	artist: string;
	album: string;
	mbid?: string;
	autocorrect?: 1 | 0;
	username?: string;
	lang?: string;
}

export interface LastFMAlbumInfo {
	album: {
		artist: string;
		listeners: string;
		mbid: string;
		image: LastFMImage[];
		name: string;
		playcount: string;
		tags: LastFMTag[];
		tracks: LastFMAlbumTracks;
		wiki: LastFMWiki;
		url: string;
	}
}

export interface LastFMAlbumTracks {
	track: LastFMAlbumTrack[]
}

export interface LastFMTrackScrobblePayload {
	artist: string;
	track: string;
	timestamp: number;
	album?: string;
	context?: string;
	streamId?: string;
	chosenByUser?: 1 | 0;
	trackNumber?: number;
	mbid?: string;
	albumArtist?: string;
	duration?: number;
}

export interface LastFMScrobbleResult {
	scrobbles: {
		'@attr': {
			accepted: number;
			ignored: number;
		};
		scrobble: {
			album: {
				'#text': string;
				corrected: string;
			};
			albumArtist: {
				'#text': string;
				corrected: string;
			};
			artist: {
				'#text': string;
				corrected: string;
			};
			ignoredMessage: {
				'#text': string;
				corrected: string;
			};
			timestamp: string;
			track: {
				'#text': string;
				corrected: string;
			};
		};
	};
}

export interface LastFMAlbumTrack {
	'@attr': {
		rank: number;
	};
	artist: {
		mbid: string;
		name: string;
		url: string;
	};
	duration: number;
	name: string;
	streamable: {
		'#text': string;
		fulltrack: string;
	};
	url: string;
}

export interface LastFMTag {
	url: string;
	name: string;
}

export interface LastFMWiki {
	content: string;
	published: string;
	summary: string;
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
		name: string;
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
	Mega = 'mega',
}
