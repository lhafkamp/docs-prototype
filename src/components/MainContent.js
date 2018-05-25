import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import queryString from 'query-string';

import WhatIsPassenger from './tutorials/WhatIsPassenger';
import FundamentalConcepts from './tutorials/FundamentalConcepts';
import Quickstart from './tutorials/Quickstart';
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
		<Route exact path='/' render={() => (<Redirect to='/tutorials/what_is_passenger/' /> )} />
		<Route exact path='/tutorials/' render={() => (<Redirect to='what_is_passenger/' /> )} />
		<Route path='/tutorials/what_is_passenger/' component={WhatIsPassenger} />
		<Route path='/tutorials/fundamental_concepts/' component={FundamentalConcepts} />
		<Route path='/tutorials/quickstart/' component={Quickstart} />
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
	componentWillMount() {
		const parsed = queryString.parse(this.props.choices.location.search);
		const languages = ['Ruby', 'Python', 'Node', 'Meteor'];
		const integrations = ['Nginx', 'Apache', 'Standalone'];

		if (!languages.includes(parsed.language)) {
			parsed.language = 'Ruby';
		}

		if (!integrations.includes(parsed.integration)) {
			parsed.integration = 'Nginx';
		}

		this.props.choices.changeLanguage(parsed.language);
		this.props.choices.changeIntegration(parsed.integration);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.choices.currentLanguage !== this.props.choices.currentLanguage ||
			prevProps.choices.currentIntegration !== this.props.choices.currentIntegration) {
			this.props.choices.history.push({
				pathname: this.props.choices.location.pathname,
				search: queryString.stringify({ 
					integration: this.props.choices.currentIntegration,
					language: this.props.choices.currentLanguage,
				})
			});
		}
	}

	render() {
		return (
			<div id="main-content">	
				<TutorialRoutes choices={this.props} />
			</div>
		);
	}
}

export default MainContent;
