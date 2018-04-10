import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './components/Main';
import PageNotFound from './components/PageNotFound';

const App = () => (
	<Switch>
		<Route exact path='/' component={Main} />
		<Route path='*' component={PageNotFound} />
	</Switch>
)

export default App;
