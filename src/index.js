import './polyfillTest';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/fn/array/includes';
import 'raf/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';

import './css/normalize.css';
import './css/global.css';

const router = (
	<Provider store={store}>
		<Router>
			<Route exact path="*" component={App}></Route>
		</Router>
	</Provider>
)

render(router, document.getElementById('root'));

registerServiceWorker();
