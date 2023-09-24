import { RequestMetainfo } from '@utils/request-metainfo';

import { LastFMAlbumGetInfoPayload, LastFMUserGetRecentTracksPayload } from '../entities';

export interface IRequestsEnvironment {
	authRequestMetainfo(callbackUrl: string): RequestMetainfo;
	authGetSessionRequestMetainfo(authenticationToken: string): RequestMetainfo;
	userGetRecentTracksRequestMetainfo(payload: LastFMUserGetRecentTracksPayload): RequestMetainfo;
	albumGetInfoRequestMetainfo(payload: LastFMAlbumGetInfoPayload): RequestMetainfo;
}
