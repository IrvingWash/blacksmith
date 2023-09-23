import {
	HttpMethod,
	RequestMetainfo,
	RequestUrl,
} from '@utils/request-metainfo';

import { IRequestsEnvironment } from './irequests-environment';
import { ICallSigner } from '../call-signer/icall-signer';

export class RequestsEnvironment implements IRequestsEnvironment {
	private readonly _baseUrl: string;
	private readonly _apiKey: string;
	private readonly _authenticationUrl: string;
	private readonly _callSigner: ICallSigner;

	public constructor(baseUrl: string, apiKey: string, authenticationUrl: string, callSigner: ICallSigner) {
		this._baseUrl = baseUrl;
		this._apiKey = apiKey;
		this._authenticationUrl = authenticationUrl;
		this._callSigner = callSigner;
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

	private _addSignatureAndFormat(url: RequestUrl): void {
		url.addQueryParams({
			api_sig: this._callSigner.sign(url.searchParams),
			format: 'json',
		});
	}
}
