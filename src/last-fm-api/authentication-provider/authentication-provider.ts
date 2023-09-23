import { IAuthenticationProvider } from './iauthentication-provider';
import { IRequestsEnvironment } from '../requests-environment.ts/irequests-environment';

export class AuthenticationProvider implements IAuthenticationProvider {
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
}
