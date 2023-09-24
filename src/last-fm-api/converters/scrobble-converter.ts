import { ScrobbleResult, ScrobbleTrackPayload } from '@domain/entities';
import { LastFMScrobbleResult, LastFMTrackScrobblePayload } from '@last-fm-api/entities';

export function convertScrobbleTrackPayload(payload: ScrobbleTrackPayload): LastFMTrackScrobblePayload {
	const {
		artistName,
		timestamp,
		trackTitle,
		albumTitle,
	} = payload;

	return {
		artist: artistName,
		timestamp: timestamp / 1000,
		track: trackTitle,
		album: albumTitle,
	};
}

export function convertLastFMScrobbleResult(lastFMScrobbleResult: LastFMScrobbleResult): ScrobbleResult {
	return {
		isSuccessful: lastFMScrobbleResult.scrobbles['@attr'].ignored === 0,
	};
}
