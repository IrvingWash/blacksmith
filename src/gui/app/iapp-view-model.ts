import { Observable } from 'gorgona';

import { ILastFM } from '@last-fm-api/ilast-fm';

import { IHeaderViewModel } from '../header/iheader-view-model';
import { IRecentTracksViewModel } from '../recent-tracks/irecent-tracks-view-model';
import { IAlbumScrobblerViewModel } from '../album-scrobbler/ialbum-scrobbler-view-model';

export interface IAppViewModel {
	readonly lastFM: ILastFM;

	readonly headerViewModel: IHeaderViewModel;
	readonly recentTracksViewModel: IRecentTracksViewModel;
	readonly albumScrobblerViewModel: IAlbumScrobblerViewModel;

	readonly isAuthorized$: Observable<boolean>;

	authorizeLastFM(): Promise<void>;
	isAuthorized(): boolean;
}
