export function ensureExists<T extends {}>(value: T | undefined | null, message?: string): T {
	if (value === undefined || value === null) {
		throw new Error(message ?? "Value doesn't exist");
	}

	return value;
}
