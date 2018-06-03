import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/components/current-selection.css';

class CurrentSelection extends Component {
	render() {
		let languageLogo;
		let integrationLogo;

		switch (this.props.currentLanguage) {
		default:
		case 'Ruby':
			languageLogo = `/img/ruby.svg`;
			break;
		case 'Python':
			languageLogo = `/img/python.svg`;
			break;
		case 'Node':
			languageLogo = `/img/node.svg`;
			break;
		case 'Meteor':
			languageLogo = `/img/meteor.svg`;
			break;
		}

		switch (this.props.currentIntegration) {
		default:
		case 'Nginx':
			integrationLogo = `/img/nginx.svg`;
			break;
		case 'Apache':
			integrationLogo = `/img/apache.svg`;
			break;
		case 'Standalone':
			integrationLogo = `/img/passenger_logo.svg`;
			break;
		}
		
		return (
			<div id="current-selection">
				<p>Current selection: </p>
				<div>
					<img src={languageLogo} alt={this.props.currentLanguage}/>{this.props.currentLanguage}
					<img src={integrationLogo} alt={this.props.currentIntegration}/>{this.props.currentIntegration}
				</div>
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

export default connect(mapStateToProps)(CurrentSelection);
