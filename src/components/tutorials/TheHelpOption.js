import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

// import components
import CurrentSelection from '../CurrentSelection';
import NextStep from '../NextStep';

// import (js) markdown components
import RubyBody from './markdown/ruby/RubyTheHelpOption';
import SharedBody from './markdown/shared/SharedTheHelpOption';

class TheHelpOption extends Component {
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
		let content = '';

		switch (this.props.currentLanguage) {
		case 'Ruby':
			content = <RubyBody />;
			break;
		default:
			content = <SharedBody />;
			break;
		}

		return (
			<div>
				<h1>Help!</h1>
				<CurrentSelection />
				<p>We have done our best to make Passenger user-friendly, but it is still possible for users to get stuck or to need help. So before we conclude this tutorial, we will teach you how to get help.</p>
				{content}
				<NextStep name="Deploy to production" path="/tutorials/deploy_to_production/" />
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

export default connect(mapStateToProps)(TheHelpOption);
