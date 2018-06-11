import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

// import components
import CurrentSelection from '../CurrentSelection';
import TableOfContents from '../TableOfContents';
import NextStep from '../NextStep';

// import (js) markdown components
import RubyBody from './markdown/ruby/RubyFundamentalConcepts';
import PythonBody from './markdown/python/PythonFundamentalConcepts';
import NodeBody from './markdown/node/NodeFundamentalConcepts';

class FundamentalConcepts extends Component {
	constructor() {
		super();
		this.state = {
			headers: ''
		}
	}

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
		let standaloneText = `In this mode, Passenger behaves somewhat like "rails server".`;

		switch (this.props.currentLanguage) {
		default:
		case 'Ruby':
			content = <RubyBody standaloneText={standaloneText} currentLanguage={this.props.currentLanguage} />;
			break;
		case 'Python':
			content = <PythonBody currentLanguage={this.props.currentLanguage} />;
			break;
		case 'Node':
			content = <NodeBody currentLanguage={this.props.currentLanguage} />;
			break;
		}

		return (
			<div>
				<h1>Fundamental concepts</h1>
				<CurrentSelection />
				<p>We give you a basic understanding of what Passenger is. We also explain how Passenger fits in the stack and how it compares to other software that you may use.</p>
				<TableOfContents />
				{content}
				<NextStep name="Quickstart" path="/tutorials/quickstart" />
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

export default connect(mapStateToProps)(FundamentalConcepts)
