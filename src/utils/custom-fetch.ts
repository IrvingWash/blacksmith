import { RequestMetainfo } from './request-metainfo';

export async function customFetch<T extends {}>(input: RequestMetainfo, body?: object): Promise<T> {
	const response = await fetch(
		input.url,
		{
			body: body !== undefined
				? JSON.stringify(body)
				: undefined,
			headers: {
				'Content-Type': 'application/json',
			},
			method: input.method,
		}
	);

	if (!response.ok) {
		throw new Error(await response.text());
	}

	return response.json();
}
