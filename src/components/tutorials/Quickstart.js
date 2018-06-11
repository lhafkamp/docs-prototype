import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

// import components
import CurrentSelection from '../CurrentSelection';
import TableOfContents from '../TableOfContents';
import NextStep from '../NextStep';

// import (js) markdown components
import RubyBody from './markdown/ruby/RubyQuickstart';
import PythonBody from './markdown/python/PythonQuickstart';
import NodeBody from './markdown/node/NodeQuickstart';

class Quickstart extends Component {
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
				<h1>Quickstart</h1>
				<CurrentSelection />
				<p>This 5 minute tutorial teaches you to start your application in a Phusion 
Passenger server, in development mode. Feel what Passenger is and how it works.</p>
				<TableOfContents />
				{content}
				<NextStep name="Installation" path="/tutorials/installation/" />
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

export default connect(mapStateToProps)(Quickstart)
