import { LastFMSession } from '../entities';

export class CredentialStorage implements CredentialStorage {
	private readonly _key = 'last-fm';

	public save(session: LastFMSession): void {
		localStorage.setItem(this._key, JSON.stringify(session));
	}

	public load(): LastFMSession | null {
		const item = localStorage.getItem(this._key);

		if (item === null) {
			return null;
		}

		try {
			return JSON.parse(item);
		} catch {
			this._clear();

			return null;
		}
	}

	public clear(): void {
		this._clear();
	}

	private _clear(): void {
		localStorage.removeItem(this._key);
	}
}
