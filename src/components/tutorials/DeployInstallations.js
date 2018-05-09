import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

class DeployInstallations extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		// markdown variables
		const header = `
# Installations`

		return (
			<div>
				<Markdown source={header} />
				<p>hi</p>
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

export default connect(mapStateToProps)(DeployInstallations);
