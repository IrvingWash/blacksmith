import { HttpMethod, RequestMetainfo, RequestUrl } from '@utils/request-metainfo';

import { IRequestsEnvironment } from './irequests-environment';

export class RequestsEnvironment implements IRequestsEnvironment {
	private readonly _baseUrl: string;
	private readonly _apiKey: string;
	private readonly _authenticationUrl: string;

	public constructor(baseUrl: string, apiKey: string, authenticationUrl: string) {
		this._baseUrl = baseUrl;
		this._apiKey = apiKey;
		this._authenticationUrl = authenticationUrl;
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
}
