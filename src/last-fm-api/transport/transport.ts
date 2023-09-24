import { customFetch } from '@utils/custom-fetch';

import {
	LastFMAlbumGetInfoPayload,
	LastFMAlbumInfo,
	LastFMRecentTracks,
	LastFMScrobbleResult,
	LastFMTrackScrobblePayload,
	LastFMUserGetRecentTracksPayload,
} from '../entities';

import { IRequestsEnvironment } from '../requests-environment.ts/irequests-environment';
import { ITransport } from './itransport';

export class Transport implements ITransport {
	private readonly _requestsEnvironment: IRequestsEnvironment;

	public constructor(requestsEnvironemnt: IRequestsEnvironment) {
		this._requestsEnvironment = requestsEnvironemnt;
	}

	public async userGetRecentTracks(payload: LastFMUserGetRecentTracksPayload): Promise<LastFMRecentTracks> {
		const recentTracks = await customFetch<LastFMRecentTracks>(
			this._requestsEnvironment.userGetRecentTracksRequestMetainfo(payload)
		);

		return recentTracks;
	}

	public async albumGetInfo(payload: LastFMAlbumGetInfoPayload): Promise<LastFMAlbumInfo> {
		const albumInfo = await customFetch<LastFMAlbumInfo>(this._requestsEnvironment.albumGetInfoRequestMetainfo(payload));

		return albumInfo;
	}

	public async trackScrobble(payload: LastFMTrackScrobblePayload): Promise<LastFMScrobbleResult> {
		const scrobbleResult = await customFetch<LastFMScrobbleResult>(this._requestsEnvironment.trackScrobbleRequestMetainfo(payload));

		return scrobbleResult;
	}
}
