export interface IAuthorizationProvider {
	requestAccess(callbackUrl: string): void;
	getAuthenticationToken(): string | null;
	authorize(authenticationToken: string): Promise<void>;
}
