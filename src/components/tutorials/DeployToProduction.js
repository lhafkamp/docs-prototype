import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

import RadioChoices from '../RadioChoices';

class DeployToProduction extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		// markdown variables
		const header = `
# Deploy to production`

		return (
			<div>
				<Markdown source={header} />
				<RadioChoices subject="provider" />
				<RadioChoices subject="edition" />
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

export default connect(mapStateToProps)(DeployToProduction);
