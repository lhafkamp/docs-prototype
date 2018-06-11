import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

// import components
import NextStep from '../NextStep';

// import (js) markdown components
import DigitalOcean from './markdown/shared/SharedDigitalOcean';

class LaunchServer extends Component {
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
		return (
			<div>
				<DigitalOcean />
				<NextStep name="Installations" path="/tutorials/deploy_to_production/installations/" />
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

export default connect(mapStateToProps)(LaunchServer);
