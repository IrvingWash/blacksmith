import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './gui/app/app';
import { AppViewModel } from './gui/app/app-view-model';

import './index.pcss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const appViewModel = new AppViewModel();

root.render(<App model={ appViewModel } />);
