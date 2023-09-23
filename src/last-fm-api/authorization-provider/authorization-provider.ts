import { customFetch } from '@utils/custom-fetch';

import { IAuthorizationProvider } from './iauthorization-provider';
import { IRequestsEnvironment } from '../requests-environment.ts/irequests-environment';

export class AuthorizationProvider implements IAuthorizationProvider {
	private readonly _requestsEnvironment: IRequestsEnvironment;

	public constructor(requestsEnvironment: IRequestsEnvironment) {
		this._requestsEnvironment = requestsEnvironment;
	}

	public requestAccess(callbackUrl: string): void {
		window.open(this._requestsEnvironment.authRequestMetainfo(callbackUrl).url, '_self');
	}

	public getAuthenticationToken(): string | null {
		const url = new URL(window.location.href);

		return url.searchParams.get('token');
	}

	public async authorize(authenticationToken: string): Promise<void> {
		const session = await customFetch(this._requestsEnvironment.authGetSessionRequestMetainfo(authenticationToken));

		console.log(session);
	}
}
