import React, { useEffect } from 'react';
import { useObservable } from 'gorgona';

import { ActionButton } from '@ui-kit/components/action-button/action-button';
import { SectionTitle } from '@ui-kit/components/section-title/section-title';

import { IRecentTracksViewModel } from './irecent-tracks-view-model';
import { RecentTrackItem } from './recent-track-item';

import * as s from './recent-tracks.pcss';

interface RecentTracksProps {
	model: IRecentTracksViewModel;
}

export function RecentTracks(props: RecentTracksProps): JSX.Element {
	const { model } = props;

	const recentTracks$ = useObservable(model.recentTracks$, model.getRecentTracks());
	const isLoading$ = useObservable(model.isLoading$, false);

	useEffect(() => {
		model.fetchRecentTracks();
	}, []);

	return (
		<div className={ s.container }>
			<SectionTitle title='recent tracks' />

		{ isLoading$
			? 'Loading...'
			: (
				<div className={ s.listContainer }>
					<ul className={ s.list }>
						{ renderRecentTracks() }
					</ul>
					<ActionButton
						className={ s.button }
						onClick={ reloadButtonClickHandler }
					>
						Reload
					</ActionButton>
				</div>
			)
		}
		</div>
	);

	function renderRecentTracks(): JSX.Element[] {
		return recentTracks$.map((track) => {
			return <RecentTrackItem track={ track } />;
		});
	}

	async function reloadButtonClickHandler(): Promise<void> {
		await model.fetchRecentTracks();
	}
}
