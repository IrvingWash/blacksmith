import { customFetch } from '@utils/custom-fetch';

import { IAuthorizationProvider } from './iauthorization-provider';
import { IRequestsEnvironment } from '../requests-environment.ts/irequests-environment';
import { ICredentialStorage } from '../credential-storage/icredential-storage';
import { LastFMSession } from '../entities';

export class AuthorizationProvider implements IAuthorizationProvider {
	private readonly _requestsEnvironment: IRequestsEnvironment;
	private readonly _credentialStorage: ICredentialStorage;
	private _authenticationToken: string | null;

	public constructor(requestsEnvironment: IRequestsEnvironment, credentialStorage: ICredentialStorage) {
		this._requestsEnvironment = requestsEnvironment;
		this._credentialStorage = credentialStorage;

		this._authenticationToken = this._tryToExtractAuthenticationToken();
	}

	public requestAccess(callbackUrl: string): void {
		window.open(this._requestsEnvironment.authRequestMetainfo(callbackUrl).url, '_self');
	}

	public async authorize(): Promise<void> {
		if (this._authenticationToken === null) {
			return;
		}

		const session = await customFetch<LastFMSession>(
			this._requestsEnvironment.authGetSessionRequestMetainfo(this._authenticationToken)
		);

		this._credentialStorage.save(session);
	}

	public signOut(): void {
		this._credentialStorage.clear();
	}

	private _tryToExtractAuthenticationToken(): string | null {
		if (this._credentialStorage.load() !== null) {
			return null;
		}

		const url = new URL(window.location.href);

		return url.searchParams.get('token');
	}
}
