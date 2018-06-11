import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import CurrentSelection from '../CurrentSelection';
import InstallLanguage from './InstallLanguage';
import InstallPassenger from './InstallPassenger';
import YesNoRadioButtons from '../YesNoRadioButtons';

class DeployInstallations extends Component {
	constructor() {
		super();
		this.state = {
			languageInstalled: 'yes'
		};

		this.handleChange = this.handleChange.bind(this);
	}

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

	handleChange(e) {
		this.setState({
			languageInstalled: e.target.value
		});
	}

	render() {
		// show content if the user didn't install a language yet
		const installLanguageContent = this.state.languageInstalled === 'yes' ? null : <InstallLanguage />;

		return (
			<div>
				<h1>Deployment: installations</h1>
				<CurrentSelection />
				<p>Before deploying your app you have to make sure that {this.props.currentLanguage} and Passenger are installed.</p>
				<h2>Did you already install {this.props.currentLanguage}?</h2>
				<YesNoRadioButtons choice={this.state.languageInstalled} action={this.handleChange} />
				{installLanguageContent}
				<InstallPassenger />
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

export default connect(mapStateToProps)(DeployInstallations);
