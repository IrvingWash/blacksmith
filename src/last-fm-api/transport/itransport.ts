import {
	LastFMAlbumGetInfoPayload,
	LastFMAlbumInfo,
	LastFMRecentTracks,
	LastFMUserGetRecentTracksPayload,
} from '../entities';

export interface ITransport {
	userGetRecentTracks(payload: LastFMUserGetRecentTracksPayload): Promise<LastFMRecentTracks>;
	albumGetInfo(payload: LastFMAlbumGetInfoPayload): Promise<LastFMAlbumInfo>;
}
