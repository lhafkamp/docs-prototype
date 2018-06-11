import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

// import components
import CurrentSelection from '../CurrentSelection';
import NextStep from '../NextStep';

// import (js) markdown components
import RubyBody from './markdown/ruby/RubyInstallation';
import SharedBody from './markdown/shared/SharedInstallation';

class Installation extends Component {
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
				<h1>Installation</h1>
				<CurrentSelection />
				{content}
				<NextStep name="The 'Passenger' command" path="/tutorials/the_passenger_command/" />
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

export default connect(mapStateToProps)(Installation);
