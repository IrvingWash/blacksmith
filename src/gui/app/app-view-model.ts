import { ILastFM } from '@last-fm-api/ilast-fm';
import { LastFM } from '@last-fm-api/last-fm';

import { IAppViewModel } from './iapp-view-model';

export class AppViewModel implements IAppViewModel {
	public readonly lastFM: ILastFM;

	public constructor() {
		this.lastFM = new LastFM();
	}
}
