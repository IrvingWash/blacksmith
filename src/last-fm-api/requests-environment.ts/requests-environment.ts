import {
	HttpMethod,
	RequestMetainfo,
	RequestUrl,
} from '@utils/request-metainfo';

import {
	LastFMAlbumGetInfoPayload,
	LastFMTrackScrobblePayload,
	LastFMUserGetRecentTracksPayload,
} from '../entities';

import { IRequestsEnvironment } from './irequests-environment';
import { ICallSigner } from '../call-signer/icall-signer';
import { ICredentialStorage } from '../credential-storage/icredential-storage';

export class RequestsEnvironment implements IRequestsEnvironment {
	private readonly _baseUrl: string;
	private readonly _apiKey: string;
	private readonly _authenticationUrl: string;
	private readonly _callSigner: ICallSigner;
	private readonly _credentialStorage: ICredentialStorage;

	public constructor(
		baseUrl: string,
		apiKey: string,
		authenticationUrl: string,
		callSigner: ICallSigner,
		credentialStorage: ICredentialStorage
	) {
		this._baseUrl = baseUrl;
		this._apiKey = apiKey;
		this._authenticationUrl = authenticationUrl;
		this._callSigner = callSigner;
		this._credentialStorage = credentialStorage;
	}

	public authRequestMetainfo(callbackUrl: string): RequestMetainfo {
		const url = new RequestUrl(this._authenticationUrl);

		url.addQueryParams({
			api_key: this._apiKey,
			cb: callbackUrl,
		});

		return {
			url,
			method: HttpMethod.Get,
		};
	}

	public authGetSessionRequestMetainfo(authenticationToken: string): RequestMetainfo {
		const url = new RequestUrl(this._baseUrl);

		url.addQueryParams({
			api_key: this._apiKey,
			token: authenticationToken,
			method: 'auth.getSession',
		});

		this._addSignatureAndFormat(url);

		return {
			url,
			method: HttpMethod.Get,
		};
	}

	public userGetRecentTracksRequestMetainfo(payload: LastFMUserGetRecentTracksPayload): RequestMetainfo {
		const url = new RequestUrl(this._baseUrl);

		url.addQueryParams({
			...payload,
			method: 'user.getRecentTracks',
			api_key: this._apiKey,
		});

		this._addSignatureAndFormat(url);

		return {
			url,
			method: HttpMethod.Get,
		};
	}

	public albumGetInfoRequestMetainfo(payload: LastFMAlbumGetInfoPayload): RequestMetainfo {
		const url = new RequestUrl(this._baseUrl);

		url.addQueryParams({
			...payload,
			method: 'album.getInfo',
			api_key: this._apiKey,
		});

		this._addSignatureAndFormat(url);

		return {
			url,
			method: HttpMethod.Get,
		};
	}

	public trackScrobbleRequestMetainfo(payload: LastFMTrackScrobblePayload): RequestMetainfo {
		const url = new RequestUrl(this._baseUrl);

		url.addQueryParams({
			...payload,
			method: 'track.scrobble',
			api_key: this._apiKey,
			sk: this._credentialStorage.load()?.session.key, // If doesn't work, try to move this below signing
		});

		this._addSignatureAndFormat(url);

		return {
			url,
			method: HttpMethod.Post,
		};
	}

	private _addSignatureAndFormat(url: RequestUrl): void {
		url.addQueryParams({
			api_sig: this._callSigner.sign(url.searchParams),
			format: 'json',
		});
	}
}
