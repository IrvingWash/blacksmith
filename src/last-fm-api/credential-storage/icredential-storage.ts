import { LastFMSession } from '../entities';

export interface ICredentialStorage {
	save(session: LastFMSession): void;
	load(): LastFMSession | null;
	clear(): void;
}
