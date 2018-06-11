import React, { Component } from 'react';
import { connect } from 'react-redux';

// import components
import NextStep from '../NextStep';

// import (js) markdown components
import RubyBody from './markdown/ruby/RubyInstallPassenger';
import NodeBody from './markdown/node/NodeInstallPassenger';

class InstallPassenger extends Component {
	render() {
		let content;

		switch(this.props.currentLanguage) {
			default:
			case 'Ruby':
				content = <RubyBody />
				break;
			case 'Node':
				content = <NodeBody />
				break;
		}

		return (
			<div>
				<h2>Installing Passenger + {this.props.currentIntegration} on a Linux/Unix production server</h2>
				{content}
				<NextStep name="Deploying your app" path="/tutorials/deploy_to_production/deploying_your_app/"></NextStep>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
		currentIntegration: state.currentIntegration
	}
}

export default connect(mapStateToProps)(InstallPassenger);
