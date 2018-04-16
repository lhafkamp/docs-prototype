import React, { Component } from 'react';
import Markdown from 'react-markdown';

class FundamentalConcepts extends Component {
	render() {
		const header = `
# Fundamental concepts`;

		return (
			<div>
				<Markdown source={header} />
			</div>
		);
	}
}

export default FundamentalConcepts;
