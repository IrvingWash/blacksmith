export interface IAuthenticationProvider {
	requestAccess(callbackUrl: string): void;
	getAuthenticationToken(): string | null;
}
