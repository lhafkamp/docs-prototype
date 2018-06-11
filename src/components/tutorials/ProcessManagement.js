import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

// import components
import CurrentSelection from '../CurrentSelection';
import TableOfContents from '../TableOfContents';
import NextStep from '../NextStep';

// import (js) markdown components
import RubyBody from './markdown/ruby/RubyProcessManagement';
import SharedBody from './markdown/shared/SharedProcessManagement';

class ProcessManagement extends Component {
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
				<h1>Process management</h1>
				<CurrentSelection />
				<p>Passenger manages multiple processes in order to maximize stability and performance. Learn how Passenger manages processes and learn about Passenger's process management tools.</p>
				<TableOfContents />
				{content}
				<NextStep name="Reloading code" path="/tutorials/reloading_code/" />
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

export default connect(mapStateToProps)(ProcessManagement);
