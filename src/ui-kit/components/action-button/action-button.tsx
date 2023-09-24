import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classNames from 'classnames';

import * as s from './action-button.pcss';

interface ActionButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {};

export function ActionButton(props: ActionButtonProps): JSX.Element {
	return (
		<button
			{ ...props }
			className={ classNames(props.className, s.container) }
		/>
	);
}
