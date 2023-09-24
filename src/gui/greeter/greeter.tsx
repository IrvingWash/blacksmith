import React from 'react';

import * as s from './greeter.pcss';

export function Greeter(): JSX.Element {
	return (
		<div className={ s.container }>
			To start using <span className={ s.title }>blacksmith</span> please authenticate your <span className={ s.redText }>last.fm</span> profile
		</div>
	);
}
