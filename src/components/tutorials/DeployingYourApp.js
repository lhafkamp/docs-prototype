import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

// import components
import NextStep from '../NextStep';

// import (js) markdown components
import RubyBody from './markdown/ruby/RubyDeployingYourAppHeroku';
import NodeBody from './markdown/node/NodeDeployingYourAppDigitalOcean';

class DeployingYourApp extends Component {
	componentWillMount() {
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: queryString.stringify({ 
				integration: this.props.currentIntegration,
				language: this.props.currentLanguage,
			})
		});
	}
	
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		let deployContent;

		switch(this.props.currentProviderChoice) {
			case 'Heroku':
				deployContent = <RubyBody />
				break;
			default:
			case 'DigitalOcean':
				deployContent = <NodeBody />
				break;
		}

		return (
			<div id="deploy-to-production">
				{deployContent}
				<h3>All done!</h3>
				<p>Congratulations, you have now deployed your app with Passenger!</p>
				<NextStep name="Deploying updates" path="/tutorials/deploy_to_production/deploy_updates/"></NextStep>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
		currentIntegration: state.currentIntegration,
		currentProviderChoice: state.currentProviderChoice
	}
}

export default connect(mapStateToProps)(DeployingYourApp);
