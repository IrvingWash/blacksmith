import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classNames from 'classnames';

import * as s from './action-button.pcss';

interface ActionButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {};

export function ActionButton(props: ActionButtonProps): JSX.Element {
	const { className, disabled } = props;

	return (
		<button
			{ ...props }
			className={ classNames(
				s.container,
				className,
				disabled
					? s.disabled
					: null
			) }
		/>
	);
}
