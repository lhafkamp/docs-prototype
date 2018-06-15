import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import queryString from 'query-string';

// import components
import CurrentSelection from '../CurrentSelection';
import TableOfContents from '../TableOfContents';

// import (js) markdown components
import NginxBody from './markdown/nginx/NginxConfigReference';

import '../../css/components/references.css';

class ConfigReference extends Component {
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
			<div id="references">
				<h1>Configuration reference</h1>
				<CurrentSelection />
				<TableOfContents />
				<NginxBody />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
		currentIntegration: state.currentIntegration
	}
}

export default connect(mapStateToProps)(ConfigReference)
