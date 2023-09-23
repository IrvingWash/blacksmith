export interface RequestMetainfo {
	url: RequestUrl,
	method: HttpMethod,
}

export type QueryParams = Record<string, string | number | undefined>;

export enum HttpMethod {
	Get = 'GET',
	Post = 'POST',
	Put = 'PUT',
	Patch = 'PATCH',
	Delete = 'DELETE',
}

export class RequestUrl extends URL {
	public addQueryParams(queryParams: QueryParams): void {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value === undefined) {
				continue;
			}

			this.searchParams.append(
				key,
				typeof value !== 'string'
					? String(value)
					: value
			);
		}
	}
}
