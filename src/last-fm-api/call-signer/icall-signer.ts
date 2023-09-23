export interface ICallSigner {
	sign(queryParams: URLSearchParams): string;
}
