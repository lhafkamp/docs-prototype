import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../css/components/table-of-contents.css';

class TableOfContents extends Component {
	constructor() {
		super();
		this.state = {
			headers: ['Loading..', '..']
		}
	}

	componentDidMount() {
		let headerArray = [];
		const headers = Array.from(document.querySelectorAll('#main-content h2'));
		headers.forEach(header => headerArray.push(header));
		this.setState({ headers: headerArray });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currentLanguage !== this.props.currentLanguage ||
			prevProps.currentIntegration !== this.props.currentIntegration ||
			prevProps.currentProviderChoice !== this.props.currentProviderChoice) {

			let headerArray = [];
			const headers = Array.from(document.querySelectorAll('#main-content h2'));
			headers.forEach(header => headerArray.push(header))
			this.setState({ headers: headerArray });
		}
	}

	render() {
		return (
			<ol id="table-of-contents">
				<p>Table of contents</p>
				{this.state.headers.map((header, i) => <li key={i}><a href={`#${header.id}`}>{header.innerText}</a></li>)}
			</ol>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
		currentIntegration: state.currentIntegration,
		currentProviderChoice: state.currentProviderChoice
	}
}

export default connect(mapStateToProps)(TableOfContents);
