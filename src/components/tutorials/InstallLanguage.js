import React, { Component } from 'react';
import { connect } from 'react-redux';

// import (js) markdown components
import RubyBody from './markdown/ruby/RubyInstallLanguage';
import PythonBody from './markdown/python/PythonInstallLanguage';
import NodeBody from './markdown/node/NodeInstallLanguage';

class InstallLanguage extends Component {
	render() {
		let content;

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
				{content}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
	}
}

export default connect(mapStateToProps)(InstallLanguage);
