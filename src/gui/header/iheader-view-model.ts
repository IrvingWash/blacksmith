import { Observable } from 'gorgona';

export interface IHeaderViewModel {
	readonly username$: Observable<string | null>;

	getUsername(): string | null;
	setUsername(value: string | null): void;
	authenticate(): void;
}
