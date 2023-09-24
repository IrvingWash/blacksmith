import { Observable, Subject } from 'gorgona';

import { ILastFM } from '@last-fm-api/ilast-fm';
import { LastFM } from '@last-fm-api/last-fm';

import { IAppViewModel } from './iapp-view-model';
import { IHeaderViewModel } from '../header/iheader-view-model';
import { HeaderViewModel } from '../header/header-view-model';
import { IRecentTracksViewModel } from '../recent-tracks/irecent-tracks-view-model';
import { RecentTracksViewModel } from '../recent-tracks/recent-tracks-view-model';

export class AppViewModel implements IAppViewModel {
	public readonly lastFM: ILastFM;

	public readonly headerViewModel: IHeaderViewModel;
	public readonly recentTracksViewModel: IRecentTracksViewModel;

	public readonly isAuthorized$: Observable<boolean>;

	private readonly _isAuthorized$: Subject<boolean>;

	public constructor() {
		this.lastFM = new LastFM();

		this.headerViewModel = new HeaderViewModel(this.lastFM);
		this.recentTracksViewModel = new RecentTracksViewModel(this.lastFM);

		this._isAuthorized$ = new Subject(this.lastFM.isAuthorized());

		this.isAuthorized$ = this._isAuthorized$.asObservable();
	}

	public isAuthorized(): boolean {
		return this._isAuthorized$.getValue();
	}

	public async authorizeLastFM(): Promise<void> {
		if (this.lastFM.isAuthorized()) {
			return;
		}

		await this.lastFM.authorizationProvider.authorize();

		this._isAuthorized$.setValue(true);
		this.headerViewModel.setUsername(this.lastFM.getUsername());
	}
}
