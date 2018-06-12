import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

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
	let providerContent;

	switch (props.provider) {
	case 'DigitalOcean':
		providerContent = 
		<React.Fragment>
			<li><NavLink to={'/tutorials/deploy_to_production/launch_server/'} activeClassName="selected">Launch server</NavLink></li>
			<li><NavLink to={'/tutorials/deploy_to_production/installations/'} activeClassName="selected">Installations</NavLink></li>
		</React.Fragment>
		break;
	case 'Heroku':
		providerContent = null;
		break;
	default: 
		providerContent = <li><NavLink to={'/tutorials/deploy_to_production/installations/'} activeClassName="selected">Installations</NavLink></li>
	}

	return (
		<React.Fragment>
			{providerContent}
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
			navState: true
		}
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.choices.location.pathname === `/tutorials/deploy_to_production/installations/` ||
				nextProps.choices.location.pathname === `/tutorials/deploy_to_production/deploying_your_app/` ||
				nextProps.choices.location.pathname === `/tutorials/deploy_to_production/deploy_updates/` ||
				nextProps.choices.location.pathname === `/tutorials/deploy_to_production/launch_server/`) {
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
			<React.Fragment>
				{mainTutorial}
				<ul>
					<span>Deployment</span>
					<li><NavLink to={'/tutorials/deploy_to_production/'} activeClassName="selected">Deploy to production</NavLink></li>
					{addDeployOptions}
					{deployingUpdates}
				</ul>
			</React.Fragment>
		);
	}
}

export default TutorialNav;
