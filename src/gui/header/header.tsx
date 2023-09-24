import React from 'react';
import { useObservable } from 'gorgona';

import { ActionButton } from '@ui-kit/components/action-button/action-button';

import { IHeaderViewModel } from './iheader-view-model';

import * as s from './header.pcss';

interface HeaderProps {
	model: IHeaderViewModel;
}

export function Header(props: HeaderProps): JSX.Element {
	const { model } = props;

	const username$ = useObservable(model.username$, model.getUsername());

	return (
		<header className={ s.container }>
			<div className={ s.logo }>
				blacksmith
			</div>

			<div className={ s.userBlock }>
				{ username$ === null
					? <ActionButton onClick={ authenticateButtonClickHandler }>Authenticate</ActionButton>
					: username$
				}
			</div>
		</header>
	);

	function authenticateButtonClickHandler(): void {
		model.authenticate();
	}
}
