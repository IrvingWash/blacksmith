import React, { ChangeEvent } from 'react';

import { SectionTitle } from '@ui-kit/components/section-title/section-title';
import { Input } from '@ui-kit/components/input/input';
import { ActionButton } from '@ui-kit/components/action-button/action-button';

import { IAlbumScrobblerViewModel } from './ialbum-scrobbler-view-model';

import * as s from './album-scrobbler.pcss';
import { useObservable } from 'gorgona';

interface AlbumScrobblerProps {
	model: IAlbumScrobblerViewModel;
}

export function AlbumScrobbler(props: AlbumScrobblerProps): JSX.Element {
	const { model } = props;

	const artist$ = useObservable(model.artist$, model.getArtist());
	const album$ = useObservable(model.album$, model.getAlbum());
	const isBlocked$ = useObservable(model.isBlocked$, false);

	return (
		<div className={ s.container }>
			<SectionTitle
				title='scrobble album'
				className={ s.header }
			/>

			<form
				onSubmit={ formSubmitHandler }
				className={ s.form }
			>
				<Input
					onChange={ artistInputChangeHandler }
					value={ artist$ ?? '' }
					required
					placeholder='artist'
					disabled={ isBlocked$ }
				/>
				<Input
					onChange={ albumInputChangeHandler }
					value={ album$ ?? '' }
					required
					placeholder='album'
					disabled={ isBlocked$ }
				/>
				<ActionButton
					type='submit'
					disabled={ isBlocked$ }
				>
					Scrobble
				</ActionButton>
			</form>
		</div>
	);

	function formSubmitHandler(event: ChangeEvent<HTMLFormElement>): void {
		event.preventDefault();

		model.scrobble();
	}

	function artistInputChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
		model.setArtist(event.target.value);
	}

	function albumInputChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
		model.setAlbum(event.target.value);
	}
}
