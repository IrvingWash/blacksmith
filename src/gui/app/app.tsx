import React, { useEffect } from 'react';
import { useObservable } from 'gorgona';

import { IAppViewModel } from './iapp-view-model';
import { Header } from '../header/header';
import { Greeter } from '../greeter/greeter';
import { RecentTracks } from '../recent-tracks/recent-tracks';
import { Scrobbler } from '../scrobbler/scrobbler';

import * as s from './app.pcss';

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
			<main className={ s.container }>
				{ isAuthorized$
					? (
						<div className={ s.dashboard }>
							<Scrobbler />
							<RecentTracks model={ model.recentTracksViewModel } />
						</div>
					)
					: <Greeter />
				}
			</main>
		</>
	);
}
