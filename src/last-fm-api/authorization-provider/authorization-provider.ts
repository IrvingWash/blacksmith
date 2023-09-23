import { customFetch } from '@utils/custom-fetch';

import { IAuthorizationProvider } from './iauthorization-provider';
import { IRequestsEnvironment } from '../requests-environment.ts/irequests-environment';
import { ICredentialStorage } from '../credential-storage/icredential-storage';
import { LastFMSession } from '../entities';

export class AuthorizationProvider implements IAuthorizationProvider {
	private readonly _requestsEnvironment: IRequestsEnvironment;
	private readonly _credentialStorage: ICredentialStorage;

	public constructor(requestsEnvironment: IRequestsEnvironment, credentialStorage: ICredentialStorage) {
		this._requestsEnvironment = requestsEnvironment;
		this._credentialStorage = credentialStorage;
	}

	public requestAccess(callbackUrl: string): void {
		window.open(this._requestsEnvironment.authRequestMetainfo(callbackUrl).url, '_self');
	}

	public getAuthenticationToken(): string | null {
		const url = new URL(window.location.href);

		return url.searchParams.get('token');
	}

	public async authorize(authenticationToken: string): Promise<void> {
		const session = await customFetch<LastFMSession>(this._requestsEnvironment.authGetSessionRequestMetainfo(authenticationToken));

		this._credentialStorage.save(session);
	}

	public logout(): void {
		this._credentialStorage.clear();
	}
}
