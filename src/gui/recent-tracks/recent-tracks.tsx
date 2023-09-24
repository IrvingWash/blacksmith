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
			<div className={ s.header }>
				<SectionTitle title='recent tracks' />
				<ActionButton
					className={ s.button }
					onClick={ reloadButtonClickHandler }
				>
					Reload
				</ActionButton>
			</div>

		{ isLoading$
			? 'Loading...'
			: (
				<ul className={ s.list }>
					{ renderRecentTracks() }
				</ul>
			)
		}
		</div>
	);

	function renderRecentTracks(): JSX.Element[] {
		return recentTracks$.map((track, i) => {
			return <RecentTrackItem key={ track.id + i } track={ track } />;
		});
	}

	async function reloadButtonClickHandler(): Promise<void> {
		await model.fetchRecentTracks();
	}
}
