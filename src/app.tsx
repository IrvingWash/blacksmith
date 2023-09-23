import React, { useEffect } from 'react';
import { LastFM } from './last-fm-api/last-fm';

export function App(): JSX.Element {
	const lastFM = new LastFM();

	useEffect(() => {
		const token = lastFM.authorizationProvider.getAuthenticationToken();

		if (token !== null) {
			lastFM.authorizationProvider.authorize(token);
		}
	}, []);

	return (
		<main>
			<button
				onClick={ (): void => lastFM.authorizationProvider.requestAccess('http://localhost:8080') }
			>
				Grant
			</button>
		</main>
	);
}
