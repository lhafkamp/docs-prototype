import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

// import components
import CurrentSelection from '../CurrentSelection';
import TableOfContents from '../TableOfContents';
import NextStep from '../NextStep';

// import (js) markdown components
import RubyBody from './markdown/ruby/RubyReloadingCode';
import SharedBody from './markdown/shared/SharedReloadingCode';

class ReloadingCode extends Component {
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
				<h1>Reloading code</h1>
				<CurrentSelection />
				<TableOfContents />
				{content}
				<NextStep name="The 'Help' option" path="/tutorials/the_help_option/" />
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

export default connect(mapStateToProps)(ReloadingCode);
