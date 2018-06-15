import React, { Component } from 'react';

import TableOfContents from './TableOfContents';

import '../css/components/right-content-toc.css';

class RightContentToC extends Component {
	render() {
		return (
			<div id="right-content-toc">
				<TableOfContents />
				<img src="/img/feedback_placeholder.svg" alt=""/>
			</div>
		);
	}
}

export default RightContentToC;
