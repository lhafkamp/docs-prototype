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
			languageLogo = `${process.env.PUBLIC_URL}/img/ruby.svg`;
			break;
		case 'Python':
			languageLogo = `${process.env.PUBLIC_URL}/img/python.svg`;
			break;
		case 'Node':
			languageLogo = `${process.env.PUBLIC_URL}/img/node.svg`;
			break;
		case 'Meteor':
			languageLogo = `${process.env.PUBLIC_URL}/img/meteor.svg`;
			break;
		}

		switch (this.props.currentIntegration) {
		default:
		case 'Nginx':
			integrationLogo = `${process.env.PUBLIC_URL}/img/nginx.svg`;
			break;
		case 'Apache':
			integrationLogo = `${process.env.PUBLIC_URL}/img/apache.svg`;
			break;
		case 'Standalone':
			integrationLogo = `${process.env.PUBLIC_URL}/img/passenger_logo.svg`;
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
