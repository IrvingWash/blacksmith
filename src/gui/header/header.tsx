import React from 'react';

import * as s from './header.pcss';

export function Header(): JSX.Element {
	return (
		<header className={ s.container }>
			<div className={ s.logo }>blacksmith</div>

			<div className={ s.userBlock }>
				IrvingWash
			</div>
		</header>
	);
}
