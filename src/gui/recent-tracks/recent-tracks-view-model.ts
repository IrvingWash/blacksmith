import { Observable, Subject } from 'gorgona';

import { ILastFM } from '@last-fm-api/ilast-fm';
import { RecentTrack } from '@domain/entities';

import { IRecentTracksViewModel } from './irecent-tracks-view-model';

export class RecentTracksViewModel implements IRecentTracksViewModel {
	public readonly recentTracks$: Observable<RecentTrack[]>;
	public readonly isLoading$: Observable<boolean>;

	private readonly _lastFM: ILastFM;

	private readonly _recentTracks$: Subject<RecentTrack[]>;
	private readonly _isLoading$: Subject<boolean>;

	public constructor(lastFM: ILastFM) {
		this._lastFM = lastFM;

		this._recentTracks$ = new Subject([]);
		this._isLoading$ = new Subject(false);

		this.recentTracks$ = this._recentTracks$.asObservable();
		this.isLoading$ = this._isLoading$.asObservable();
	}

	public getRecentTracks(): RecentTrack[] {
		return this._recentTracks$.getValue();
	}

	public async fetchRecentTracks(): Promise<void> {
		await this._fetchRecentTracks();
	}

	private async _fetchRecentTracks(): Promise<void> {
		this._isLoading$.setValue(true);

		try {
			const recentTracks = await this._lastFM.getRecentTracks({
				username: this._lastFM.getUsername()!,
				extendedData: true,
			});

			this._recentTracks$.setValue(recentTracks);
		} finally {
			this._isLoading$.setValue(false);
		}
	}
}
