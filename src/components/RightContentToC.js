import React, { Component } from 'react';

import TableOfContents from './TableOfContents';

import '../css/components/right-content-toc.css';

class RightContentToC extends Component {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div id="right-content-toc">
				<TableOfContents />
				<img src="/img/feedback_placeholder.svg" alt=""/>
				<a onClick={this.handleClick} className="light-button">Up</a>
			</div>
		);
	}
}

export default RightContentToC;
