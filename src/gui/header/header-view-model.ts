import { Observable, Subject } from 'gorgona';

import { ILastFM } from '@last-fm-api/ilast-fm';

import { IHeaderViewModel } from './iheader-view-model';

export class HeaderViewModel implements IHeaderViewModel {
	public username$: Observable<string | null>;

	private _username$: Subject<string | null>;

	private _lastFM: ILastFM;

	public constructor(lastFM: ILastFM) {
		this._lastFM = lastFM;

		this._username$ = new Subject(this._lastFM.getUsername());

		this.username$ = this._username$.asObservable();
	}

	public authenticate(): void {
		this._lastFM.authorizationProvider.requestAccess(window.location.href);
	}

	public getUsername(): string | null {
		return this._username$.getValue();
	}

	public setUsername(value: string | null): void {
		this._username$.setValue(value);
	}
}
