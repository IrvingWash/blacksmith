import { ensureExists } from './ensure-exists';

export class EnvExtractor {
	public static get lastFMApiKey(): string {
		return ensureExists(
			process.env['LAST_FM_API_KEY'],
			this._makeNotProvidedMessage('LAST_FM_API_KEY')
		);
	}

	public static get lastFMSharedSecret(): string {
		return ensureExists(
			process.env['LAST_FM_SHARED_SECRET'],
			this._makeNotProvidedMessage('LAST_FM_SHARED_SECRET')
		);
	}

	private static _makeNotProvidedMessage(variableName: string): string {
		return `Environment variable ${variableName} is not provided`;
	}
}
