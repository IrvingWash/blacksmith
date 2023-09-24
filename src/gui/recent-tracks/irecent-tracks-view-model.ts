import { Observable } from 'gorgona';

import { RecentTrack } from '@domain/entities';

export interface IRecentTracksViewModel {
	readonly recentTracks$: Observable<RecentTrack[]>;
	readonly isLoading$: Observable<boolean>;

	getRecentTracks(): RecentTrack[];
	fetchRecentTracks(): Promise<void>;
}
