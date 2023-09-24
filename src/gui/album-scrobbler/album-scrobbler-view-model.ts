import { Observable, Subject } from 'gorgona';

import { ILastFM } from '@last-fm-api/ilast-fm';

import { IAlbumScrobblerViewModel } from './ialbum-scrobbler-view-model';
import { AlbumInfo } from '@domain/entities';

export class AlbumScrobblerViewModel implements IAlbumScrobblerViewModel {
	public readonly artist$: Observable<string | null>;
	public readonly album$: Observable<string | null>;
	public readonly isBlocked$: Observable<boolean>;

	private readonly _lastFM: ILastFM;

	private readonly _artist$: Subject<string | null>;
	private readonly _album$: Subject<string | null>;
	private readonly _isBlocked$: Subject<boolean>;

	public constructor(lastFM: ILastFM) {
		this._lastFM = lastFM;

		this._artist$ = new Subject(null);
		this._album$ = new Subject(null);
		this._isBlocked$ = new Subject(false);

		this.artist$ = this._artist$.asObservable();
		this.album$ = this._album$.asObservable();
		this.isBlocked$ = this._isBlocked$.asObservable();
	}

	public getArtist(): string | null {
		return this._artist$.getValue();
	}

	public getAlbum(): string | null {
		return this._album$.getValue();
	}

	public setArtist(value: string | null): void {
		this._artist$.setValue(value);
	}

	public setAlbum(value: string | null): void {
		this._album$.setValue(value);
	}

	public async scrobble(): Promise<void> {
		this._isBlocked$.setValue(true);

		try {
			const albumInfo = await this._getAlbumInfo();

			if (albumInfo === null) {
				// TODO: Add error system.
				return;
			}

			const sortedTracks = [...albumInfo.tracks].sort((a, b) => a.number - b.number);

			for (const track of sortedTracks) {
				const {
					artistName,
					albumTitle,
					title,
				} = track;

				await this._lastFM.scrobbleTrack({
					artistName,
					albumTitle,
					trackTitle: title,
					timestamp: Date.now(),
				});
			}
		} finally {
			this._isBlocked$.setValue(false);
		}

		this._clear();
	}

	private async _getAlbumInfo(): Promise<AlbumInfo | null> {
		const artist = this.getArtist();
		const album = this.getAlbum();

		if (artist === null || album === null) {
			return null;
		}

		return this._lastFM.getAlbumInfo({
			artist,
			album,
		});
	}

	private _clear(): void {
		this.setArtist(null);
		this.setAlbum(null);
	}
}
