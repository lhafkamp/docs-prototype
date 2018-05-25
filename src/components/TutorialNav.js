import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import queryString from 'query-string';

import Dropdown from './Dropdown';
import '../css/components/tutorial-nav.css';

// render the normal nav
function MainTutorialContent() {
	return (
		<React.Fragment>
			<ul>
				<span>About Passenger</span>
				<li><NavLink exact to={'/tutorials/what_is_passenger/'} activeClassName="selected">What is Passenger?</NavLink></li>
				<li><NavLink to={'/tutorials/fundamental_concepts/'} activeClassName="selected">Fundamental concepts</NavLink></li>
			</ul>

			<ul>
				<span>Getting started</span>
				<li><NavLink to={'/tutorials/quickstart/'} activeClassName="selected">Quickstart</NavLink></li>
				<li><NavLink to={'/tutorials/installation/'} activeClassName="selected">Installation</NavLink></li>
				<li><NavLink to={'/tutorials/the_passenger_command/'} activeClassName="selected">The ‘passenger’ command</NavLink></li>
				<li><NavLink to={'/tutorials/process_management/'} activeClassName="selected">Process management</NavLink></li>
				<li><NavLink to={'/tutorials/reloading_code/'} activeClassName="selected">Reloading code</NavLink></li>
				<li><NavLink to={'/tutorials/the_help_option/'} activeClassName="selected">The --help option</NavLink></li>
			</ul>
		</React.Fragment>
	)
}

// render an isolated nav once you go to deployment
function DeployContent(props) {
	const installations = props.provider !== 'Heroku' ? <li><NavLink to={'/tutorials/deploy_to_production/installations/'} activeClassName="selected">Installations</NavLink></li> : null;

	return (
		<React.Fragment>
			{installations}
			<li><NavLink to={'/tutorials/deploy_to_production/deploying_your_app/'} activeClassName="selected">Deploying your app</NavLink></li>
			<li><NavLink to={'/tutorials/deploy_to_production/deploy_updates/'} activeClassName="selected">Deploy updates</NavLink></li>
			<li className="back-btn"><Link to="/tutorials/deploy_to_production" className="light-button">Back</Link></li>
		</React.Fragment>
	)
}

class TutorialNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			languages: ['Ruby', 'Python', 'Node', 'Meteor'],
			integrations: ['Nginx', 'Apache', 'Standalone'],
			navState: true,
			parsed: queryString.parse(this.props.choices.location.search)
		}
	}

	componentWillMount() {
		if (this.props.choices.location.search !== '') {
			const parsed = queryString.parse(this.props.choices.location.search);
			const languages = ['Ruby', 'Python', 'Node', 'Meteor'];
			const integrations = ['Nginx', 'Apache', 'Standalone'];

			if (!languages.includes(parsed.language)) {
				parsed.language = 'Ruby';
			}

			if (!integrations.includes(parsed.integration)) {
				parsed.integration = 'Nginx';
			}

			// order the dropdown selections based on the URL
			const parsedLanguages = [parsed.language, ...languages]
			const parsedIntegrations = [parsed.integration, ...integrations]
			const languageArr = [...new Set(parsedLanguages)]
			const integrationArr = [...new Set(parsedIntegrations)]
			
			this.setState({
				languages: languageArr,
				integrations: integrationArr
			});
		}
	}

	componentWillReceiveProps(nextProps){
		// TODO switch || with 1 params
		if (nextProps.choices.location.pathname === `/tutorials/deploy_to_production/installations/` ||
				nextProps.choices.location.pathname === `/tutorials/deploy_to_production/deploying_your_app/` ||
				nextProps.choices.location.pathname === `/tutorials/deploy_to_production/deploy_updates/`) {
			this.setState({
				navState: false
			});
		} else if (!this.state.navState) {
			this.setState({
				navState: true
			})
		}
  }

	render() {
		const mainTutorial = this.state.navState ? <MainTutorialContent /> : null;
		const deployingUpdates = this.state.navState ?<li><NavLink to={'/tutorials/deploy_updates/'} activeClassName="selected">Deploying updates</NavLink></li> : null;
		const addDeployOptions = this.state.navState ? null : <DeployContent provider={this.props.choices.currentProviderChoice} />

		return (
			<div id="tutorial-nav">
				<img className="version" src="/img/version.png" alt="gem version"/>
				<Dropdown choices={this.props.choices} name="language" default={this.state.parsed.language || 'Ruby'} items={this.state.languages} />
				<Dropdown choices={this.props.choices} name="integration" default={this.state.parsed.integration || 'Nginx'} items={this.state.integrations} />

				{mainTutorial}

				<ul>
					<span>Deployment</span>
					<li><NavLink to={'/tutorials/deploy_to_production/'} activeClassName="selected">Deploy to production</NavLink></li>
					{addDeployOptions}
					{deployingUpdates}
				</ul>
			</div>
		);
	}
}

export default TutorialNav;
