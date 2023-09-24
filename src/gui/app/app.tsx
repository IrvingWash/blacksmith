import React, { useEffect } from 'react';

import { IAppViewModel } from './iapp-view-model';
import { Header } from '../header/header';
import { Greeter } from '../greeter/greeter';
import { useObservable } from 'gorgona';

interface AppProps {
	model: IAppViewModel;
}

export function App(props: AppProps): JSX.Element {
	const { model } = props;

	const isAuthorized$ = useObservable(model.isAuthorized$, model.isAuthorized());

	useEffect(() => {
		model.authorizeLastFM();
	});

	return (
		<>
			<Header model={ model.headerViewModel } />
			<main>
				{ isAuthorized$
					? null
					: <Greeter />
				}
			</main>
		</>
	);
}
