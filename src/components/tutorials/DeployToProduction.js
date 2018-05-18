import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

import RadioChoices from '../RadioChoices';
import NextStep from '../NextStep';

class DeployToProduction extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		// markdown variables
		const header = `
# Deploy to production`

		const subTitle = `
This is an end-to-end tutorial that teaches you how to install ${this.props.currentLanguage} and Passenger on a production server. This tutorial will ask you some questions, so the exact tutorial steps depend on the choices you make.`

		// variable for different paths depending on the provider
		let path;

		switch(this.props.currentProviderChoice) {
			default:
			case 'AWS':
				path = '/tutorials/deploy_to_production/launch_server/'
				break;
			case 'Cloud66':
				path = '/tutorials/deploy_to_production/deploying_your_app/'
				break;
			case 'DigitalOcean':
				path = '/tutorials/deploy_to_production/launch_server/'
				break;
			case 'Heroku':
				path = '/tutorials/deploy_to_production/deploying_your_app/'
				break;
			case 'LinuxUnix':
				path = '/tutorials/deploy_to_production/installations/'
				break;
		}

		return (
			<div id="deploy-to-production">
				<Markdown source={header} />
				<Markdown source={subTitle} />
				<h2>Select your deployment method</h2>
				<p>Please start by selecting the hosting provider or infrastructure that you want to deploy to.</p>
				<RadioChoices subject="provider" />
				<h2>Open source or Enterprise?</h2>
				<p>Please select the Passenger edition that you are using.</p>
				<RadioChoices subject="edition" />
				<NextStep name="Deployment installations" path={path}></NextStep>
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

export default connect(mapStateToProps)(DeployToProduction);
