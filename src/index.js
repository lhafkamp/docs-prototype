import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import './css/normalize.css';
import './css/global.css';

render((
	<Router>
		<App />
	</Router>
), document.getElementById('root'));

registerServiceWorker();
