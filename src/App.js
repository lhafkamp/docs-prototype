import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './components/Main';

const App = () => (
	<Switch>
		<Route exact path='*' component={Main} />
	</Switch>
)

export default App;
