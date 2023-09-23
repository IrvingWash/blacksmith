export interface IAuthorizationProvider {
	requestAccess(callbackUrl: string): void;
	getAuthenticationToken(): string | null;
}
