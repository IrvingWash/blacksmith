import React from 'react';

import { SectionTitle } from '@ui-kit/components/section-title/section-title';

import * as s from './scrobbler.pcss';

export function Scrobbler(): JSX.Element {
	return (
		<div className={ s.container }>
			<SectionTitle
				title='scrobbler'
				className={ s.header }
			/>
		</div>
	);
}
