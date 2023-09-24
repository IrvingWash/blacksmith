import {
	LastFMAlbumGetInfoPayload,
	LastFMAlbumInfo,
	LastFMRecentTracks,
	LastFMScrobbleResult,
	LastFMTrackScrobblePayload,
	LastFMUserGetRecentTracksPayload,
} from '../entities';

export interface ITransport {
	userGetRecentTracks(payload: LastFMUserGetRecentTracksPayload): Promise<LastFMRecentTracks>;
	albumGetInfo(payload: LastFMAlbumGetInfoPayload): Promise<LastFMAlbumInfo>;
	trackScrobble(payload: LastFMTrackScrobblePayload): Promise<LastFMScrobbleResult>;
}
