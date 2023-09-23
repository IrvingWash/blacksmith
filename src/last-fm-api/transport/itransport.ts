import { LastFMRecentTracks, LastFMUserGetRecentTracksPayload } from '../entities';

export interface ITransport {
	userGetRecentTracks(payload: LastFMUserGetRecentTracksPayload): Promise<LastFMRecentTracks>;
}
