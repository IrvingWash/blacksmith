import {
	GetRecentTracksPayload,
	RecentTrack,
	MediaImage,
	TrackImageSize,
} from '@domain/entities';

import {
	LastFMImage,
	LastFMImageSize,
	LastFMRecentTrack,
	LastFMUserGetRecentTracksPayload,
} from '../entities';

export function convertGetRecentTracksPayload(payload: GetRecentTracksPayload): LastFMUserGetRecentTracksPayload {
	const {
		username,
		extendedData,
		since,
		till,
		page,
		trackLimit,
	} = payload;

	return {
		user: username,
		extended: extendedData ? 1 : 0,
		from: since,
		to: till,
		page,
		limit: trackLimit,
	};
}

export function convertLastFMRecentTrack(lastFMRecentTrack: LastFMRecentTrack): RecentTrack {
	const {
		album,
		artist,
		date,
		image,
		name,
		url,
		mbid,
	} = lastFMRecentTrack;

	return {
		id: mbid,
		title: name,
		artist: artist.name,
		albumTitle: album['#text'] === '' ? undefined : album['#text'],
		scrobbleDate: date['#text'],
		url,
		image: image.map(convertLastFMImage),
	};
}

const lastFMtrackImageSizeToImageSizeMap: Readonly<Record<LastFMImageSize, TrackImageSize>> = {
	[LastFMImageSize.Small]: TrackImageSize.Small,
	[LastFMImageSize.Medium]: TrackImageSize.Medium,
	[LastFMImageSize.Large]: TrackImageSize.Large,
	[LastFMImageSize.ExtraLarge]: TrackImageSize.ExtraLarge,
	[LastFMImageSize.Mega]: TrackImageSize.Mega,
} as const;

function convertLastFMImage(lastFMImage: LastFMImage): MediaImage {
	return {
		url: lastFMImage['#text'],
		size: lastFMtrackImageSizeToImageSizeMap[lastFMImage.size],
	};
}
