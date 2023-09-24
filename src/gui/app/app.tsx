import React, { useEffect } from 'react';

import { IAppViewModel } from './iapp-view-model';

interface AppProps {
	model: IAppViewModel;
}

export function App(props: AppProps): JSX.Element {
	const { model } = props;

	useEffect(() => {
		model.lastFM.authorizationProvider.authorize();
	}, []);

	return (
		<main>
			<button
				onClick={ (): void => model.lastFM.authorizationProvider.requestAccess(window.location.href) }
			>
				Authenticate
			</button>
		</main>
	);
}
