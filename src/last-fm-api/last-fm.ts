import { EnvExtractor } from '@utils/env-extractor';

import { ILastFM } from './ilast-fm';

export class LastFM implements ILastFM {
	private readonly _apiKey: string;
	private readonly _sharedSecret: string;

	public constructor() {
		this._apiKey = EnvExtractor.lastFMApiKey;
		this._sharedSecret = EnvExtractor.lastFMSharedSecret;
	}
}
