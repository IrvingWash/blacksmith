import React from 'react';

import { RecentTrack, TrackImageSize } from '@domain/entities';

import * as s from './recent-track-item.pcss';

interface RecentTrackItemProps {
	track: RecentTrack;
}

export function RecentTrackItem(props: RecentTrackItemProps): JSX.Element {
	const { track } = props;

	console.log(track.albumTitle);

	return (
		<li className={ s.container }>
			<div>
				<p>title: { track.title }</p>
				<p>artist: { track.artist }</p>
				{ track.albumTitle !== undefined &&
					<p>album: { track.albumTitle }</p>
				}
				<p>date: { track.scrobbleDate }</p>
			</div>
			<img className={ s.icon } src={ track.image.find((i) => i.size === TrackImageSize.Medium)?.url } />
		</li>
	);
}
