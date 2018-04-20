import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import WhatIsPassenger from './tutorials/WhatIsPassenger';
import FundamentalConcepts from './tutorials/FundamentalConcepts';
import '../css/components/main-content.css';

const TutorialRoutes = () => (
	<Switch>
		<Route exact path='/tutorials/' component={WhatIsPassenger} />
		<Route path='/tutorials/what_is_passenger/' component={WhatIsPassenger} />
		<Route path='/tutorials/fundamental_concepts/' component={FundamentalConcepts} />
	</Switch>
);

class MainContent extends Component {
	render() {
		return (
			<div id="main-content">
				<TutorialRoutes choices={this.props} />
			</div>
		);
	}
}

export default MainContent;
