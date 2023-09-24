import React from 'react';
import classNames from 'classnames';

import * as s from './section-title.pcss';

interface SectionTitleProps {
	title: string;
	className?: string;
}

export function SectionTitle(props: SectionTitleProps): JSX.Element {
	const { title, className } = props;

	return (
		<h2
			className={ classNames(s.container, className) }
		>
			{ title }
		</h2>
	);
}
