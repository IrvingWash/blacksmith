import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import * as s from './input.pcss';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	stretch?: boolean;
}

export function Input(props: InputProps): JSX.Element {
	const { className, stretch = false } = props;

	return (
		<input
			{ ...props }
			className={ classNames(s.container, className, stretch ? s.stretch : null) }
		/>
	);
}
