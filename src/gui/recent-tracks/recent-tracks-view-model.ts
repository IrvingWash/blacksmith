import { Observable, Subject } from 'gorgona';

import { ILastFM } from '@last-fm-api/ilast-fm';
import { RecentTrack } from '@domain/entities';

import { IRecentTracksViewModel } from './irecent-tracks-view-model';

export class RecentTracksViewModel implements IRecentTracksViewModel {
	public readonly recentTracks$: Observable<RecentTrack[]>;

	private readonly _lastFM: ILastFM;

	private readonly _recentTracks$: Subject<RecentTrack[]>;

	public constructor(lastFM: ILastFM) {
		this._lastFM = lastFM;

		this._recentTracks$ = new Subject([]);

		this.recentTracks$ = this._recentTracks$.asObservable();
	}

	public getRecentTracks(): RecentTrack[] {
		return this._recentTracks$.getValue();
	}

	public async fetchRecentTracks(): Promise<void> {
		await this._fetchRecentTracks();
	}

	private async _fetchRecentTracks(): Promise<void> {
		const recentTracks = await this._lastFM.getRecentTracks({
			username: this._lastFM.getUsername()!,
			extendedData: true,
		});

		this._recentTracks$.setValue(recentTracks);
	}
}
