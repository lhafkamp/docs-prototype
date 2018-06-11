import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

// import components
import CurrentSelection from '../CurrentSelection';
import TableOfContents from '../TableOfContents';
import NextStep from '../NextStep';

// import (js) markdown components
import RubyBody from './markdown/ruby/RubyThePassengerCommand';
import PythonBody from './markdown/python/PythonThePassengerCommand';
import NodeBody from './markdown/node/NodeThePassengerCommand';

class ThePassengerCommand extends Component {
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
		default:
		case 'Ruby':
			content = <RubyBody />;
			break;
		case 'Python':
			content = <PythonBody />;
			break;
		case 'Node':
			content = <NodeBody />;
			break;
		}
		
		return (
			<div>
				<h1>The 'passenger' command</h1>
				<CurrentSelection />
				<p>The passenger command starts or stops a <code>Passenger</code> server in Standalone mode. In this section we will teach you how to use this command.</p>
				<TableOfContents />
				{content}
				<NextStep name="Process management" path="/tutorials/process_management/" />
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

export default connect(mapStateToProps)(ThePassengerCommand);
