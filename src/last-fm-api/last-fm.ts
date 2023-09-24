import {
	AlbumInfo,
	GetAlbumInfoPayload,
	GetRecentTracksPayload,
	RecentTrack,
	ScrobbleResult,
	ScrobbleTrackPayload,
} from '@domain/entities';

import { EnvExtractor } from '@utils/env-extractor';

import { ILastFM } from './ilast-fm';
import { ICallSigner } from './call-signer/icall-signer';
import { CallSigner } from './call-signer/call-signer';
import { ICredentialStorage } from './credential-storage/icredential-storage';
import { CredentialStorage } from './credential-storage/credential-storage';
import { IRequestsEnvironment } from './requests-environment.ts/irequests-environment';
import { RequestsEnvironment } from './requests-environment.ts/requests-environment';
import { IAuthorizationProvider } from './authorization-provider/iauthorization-provider';
import { AuthorizationProvider } from './authorization-provider/authorization-provider';
import { ITransport } from './transport/itransport';
import { Transport } from './transport/transport';
import { convertGetRecentTracksPayload, convertLastFMRecentTrack } from './converters/recent-track-converter';
import { convertGetAlbumInfoPayload, convertLastFMAlbumInfo } from './converters/album-info-converter';
import { convertLastFMScrobbleResult, convertScrobbleTrackPayload } from './converters/scrobble-converter';

export class LastFM implements ILastFM {
	public readonly authorizationProvider: IAuthorizationProvider;

	private readonly _apiKey: string;
	private readonly _sharedSecret: string;
	private readonly _baseUrl: string = 'https://ws.audioscrobbler.com/2.0/';
	private readonly _authenticationUrl: string = 'https://www.last.fm/api/auth/';

	private readonly _callSigner: ICallSigner;
	private readonly _credentialStorage: ICredentialStorage;
	private readonly _requestsEnvironment: IRequestsEnvironment;
	private readonly _transport: ITransport;

	public constructor() {
		this._apiKey = EnvExtractor.lastFMApiKey;
		this._sharedSecret = EnvExtractor.lastFMSharedSecret;

		this._callSigner = new CallSigner(this._sharedSecret);
		this._credentialStorage = new CredentialStorage();

		this._requestsEnvironment = new RequestsEnvironment(
			this._baseUrl,
			this._apiKey,
			this._authenticationUrl,
			this._callSigner,
			this._credentialStorage
		);

		this.authorizationProvider = new AuthorizationProvider(this._requestsEnvironment, this._credentialStorage);
		this._transport = new Transport(this._requestsEnvironment);
	}

	public isAuthorized(): boolean {
		return this._credentialStorage.load() !== null;
	}

	public getUsername(): string | null {
		return this._credentialStorage.load()?.session.name ?? null;
	}

	public async getRecentTracks(payload: GetRecentTracksPayload): Promise<RecentTrack[]> {
		const lastFMRecentTracks = await this._transport.userGetRecentTracks(convertGetRecentTracksPayload(payload));

		return lastFMRecentTracks.recenttracks.track.map(convertLastFMRecentTrack);
	}

	public async getAlbumInfo(payload: GetAlbumInfoPayload): Promise<AlbumInfo> {
		const albumInfo = await this._transport.albumGetInfo(convertGetAlbumInfoPayload(payload));

		return convertLastFMAlbumInfo(albumInfo);
	}

	public async scrobbleTrack(payload: ScrobbleTrackPayload): Promise<ScrobbleResult> {
		const scrobbleResult = await this._transport.trackScrobble(convertScrobbleTrackPayload(payload));

		return convertLastFMScrobbleResult(scrobbleResult);
	}
}
