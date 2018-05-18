import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import WhatIsPassenger from './tutorials/WhatIsPassenger';
import FundamentalConcepts from './tutorials/FundamentalConcepts';
import GettingStarted from './tutorials/GettingStarted';
import Installation from './tutorials/Installation';
import ThePassengerCommand from './tutorials/ThePassengerCommand';
import ProcessManagement from './tutorials/ProcessManagement';
import ReloadingCode from './tutorials/ReloadingCode';
import TheHelpOption from './tutorials/TheHelpOption';
import DeployToProduction from './tutorials/DeployToProduction';
import DeployInstallations from './tutorials/DeployInstallations';
import DeployingYourApp from './tutorials/DeployingYourApp';
import DeployUpdates from './tutorials/DeployUpdates';
import PageNotFound from './PageNotFound';
import '../css/components/main-content.css';

const TutorialRoutes = () => (
	<Switch>
		<Route exact path='/tutorials/' component={WhatIsPassenger} />
		<Route path='/tutorials/what_is_passenger/' component={WhatIsPassenger} />
		<Route path='/tutorials/fundamental_concepts/' component={FundamentalConcepts} />
		<Route path='/tutorials/getting_started/' component={GettingStarted} />
		<Route path='/tutorials/installation/' component={Installation} />
		<Route path='/tutorials/the_passenger_command/' component={ThePassengerCommand} />
		<Route path='/tutorials/process_management/' component={ProcessManagement} />
		<Route path='/tutorials/reloading_code/' component={ReloadingCode} />
		<Route path='/tutorials/the_help_option/' component={TheHelpOption} />
		<Route exact path='/tutorials/deploy_to_production/' component={DeployToProduction} />
		<Route path='/tutorials/deploy_updates/' component={DeployUpdates} />
		<Route path='/tutorials/deploy_to_production/installations/' component={DeployInstallations} />
		<Route path='/tutorials/deploy_to_production/deploying_your_app/' component={DeployingYourApp} />
		<Route path='/tutorials/deploy_to_production/deploy_updates/' component={DeployUpdates} />
		<Route path='*' component={PageNotFound} />
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
