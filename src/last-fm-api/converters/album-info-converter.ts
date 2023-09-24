import { AlbumInfo, AlbumTrack, GetAlbumInfoPayload } from '@domain/entities';
import { LastFMAlbumGetInfoPayload, LastFMAlbumInfo, LastFMAlbumTrack } from '@last-fm-api/entities';

export function convertGetAlbumInfoPayload(payload: GetAlbumInfoPayload): LastFMAlbumGetInfoPayload {
	const {
		album,
		artist,
		language,
		shouldAutoCorrect,
		username,
	} = payload;

	return {
		album,
		artist,
		autocorrect: shouldAutoCorrect ? 1 : 0,
		lang: language,
		username,
	};
}

export function convertLastFMAlbumInfo(lastFMAlbumInfo: LastFMAlbumInfo): AlbumInfo {
	const {
		artist,
		mbid,
		name,
		tracks,
	} = lastFMAlbumInfo.album;

	return {
		artist,
		id: mbid,
		title: name,
		tracks: tracks.track.map((lastFMAlbumTrack) => convertLastFMAlbumTrack(lastFMAlbumTrack, name)),
	};
}

function convertLastFMAlbumTrack(lastFMAlbumTrack: LastFMAlbumTrack, albumTitle: string): AlbumTrack {
	const { name, artist } = lastFMAlbumTrack;

	return {
		title: name,
		artistName: artist.name,
		albumTitle,
		number: lastFMAlbumTrack['@attr'].rank,
	};
}
