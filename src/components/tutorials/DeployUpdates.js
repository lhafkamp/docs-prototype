import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import queryString from 'query-string';

// import components
import CurrentSelection from '../CurrentSelection';

// import (js) markdown components
import RubyBody from './markdown/ruby/RubyDeployUpdates';
import NodeBody from './markdown/node/NodeDeployUpdates';

class DeployingYourApp extends Component {
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
		
		const conclusion = `
## Conclusion

Congratulations, you have successfully deployed your web application using Passenger!

To fully master Passenger, please take a look at the [advanced guides](/advanced/).
`

		switch (this.props.currentLanguage) {
		default:
		case 'Ruby':
			content = <RubyBody />;
			break;
		case 'Node':
			content = <NodeBody />;
			break;
		}

		return (
			<div>
				<h1>Deploying application updates</h1>
				<CurrentSelection />
				<p>In the previous step, you deployed an application to your production server for the first time. But what do you do when you have updated your app, and need to deploy updates? You will learn that on this page.</p>
				{content}
				<Markdown source={conclusion} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
		currentIntegration: state.currentIntegration,
		currentProviderChoice: state.currentProviderChoice
	}
}

export default connect(mapStateToProps)(DeployingYourApp);
