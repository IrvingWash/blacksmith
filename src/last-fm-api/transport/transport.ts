import { customFetch } from '@utils/custom-fetch';

import { LastFMRecentTracks, LastFMUserGetRecentTracksPayload } from '../entities';
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
}
