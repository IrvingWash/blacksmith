import { Observable } from 'gorgona';

export interface IAlbumScrobblerViewModel {
	readonly artist$: Observable<string | null>;
	readonly album$: Observable<string | null>;
	readonly isBlocked$: Observable<boolean>;

	getArtist(): string | null;
	getAlbum(): string | null;
	setArtist(value: string | null): void;
	setAlbum(value: string | null): void;
	scrobble(): Promise<void>;
}
