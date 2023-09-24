export interface IAuthorizationProvider {
	requestAccess(callbackUrl: string): void;
	authorize(): Promise<void>;
	signOut(): void;
}
