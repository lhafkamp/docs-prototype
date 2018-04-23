import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NextStep extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			path: ''
		}
	}

	render() {
		return (
			<div id="next-step">
				<h2>Next step: {this.props.name}</h2>
				<Link to={this.props.path} className="dark-button">Continue</Link>
			</div>
		);
	}
}

export default NextStep;
