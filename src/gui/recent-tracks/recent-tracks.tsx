import React, { useEffect } from 'react';
import { useObservable } from 'gorgona';

import { ActionButton } from '@ui-kit/components/action-button/action-button';
import { SectionTitle } from '@ui-kit/components/section-title/section-title';

import { IRecentTracksViewModel } from './irecent-tracks-view-model';

import * as s from './recent-tracks.pcss';
import { RecentTrackItem } from './recent-track-item';

interface RecentTracksProps {
	model: IRecentTracksViewModel;
}

export function RecentTracks(props: RecentTracksProps): JSX.Element {
	const { model } = props;

	const recentTracks$ = useObservable(model.recentTracks$, model.getRecentTracks());

	useEffect(() => {
		model.fetchRecentTracks();
	}, []);

	return (
		<div>
			<SectionTitle title='recent tracks' />

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
