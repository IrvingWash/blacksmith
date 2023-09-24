import { Observable } from 'gorgona';

import { ILastFM } from '@last-fm-api/ilast-fm';

import { IHeaderViewModel } from '../header/iheader-view-model';

export interface IAppViewModel {
	readonly lastFM: ILastFM;
	readonly headerViewModel: IHeaderViewModel;
	readonly isAuthorized$: Observable<boolean>;

	authorizeLastFM(): Promise<void>;
	isAuthorized(): boolean;
}
