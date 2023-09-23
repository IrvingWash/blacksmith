import { EnvExtractor } from '@utils/env-extractor';

import { ILastFM } from './ilast-fm';
import { IRequestsEnvironment } from './requests-environment.ts/irequests-environment';
import { RequestsEnvironment } from './requests-environment.ts/requests-environment';
import { IAuthenticationProvider } from './authentication-provider/iauthentication-provider';
import { AuthenticationProvider } from './authentication-provider/authentication-provider';

export class LastFM implements ILastFM {
	public readonly authenticationProvider: IAuthenticationProvider;

	private readonly _apiKey: string;
	private readonly _sharedSecret: string;
	private readonly _baseUrl: string = 'http://ws.audioscrobbler.com/2.0/';
	private readonly _authenticationUrl: string = 'http://www.last.fm/api/auth/';

	private readonly _requestsEnvironment: IRequestsEnvironment;

	public constructor() {
		this._apiKey = EnvExtractor.lastFMApiKey;
		this._sharedSecret = EnvExtractor.lastFMSharedSecret;

		this._requestsEnvironment = new RequestsEnvironment(this._baseUrl, this._apiKey, this._authenticationUrl);

		this.authenticationProvider = new AuthenticationProvider(this._requestsEnvironment);
	}
}
