import React, { Component } from 'react';

import ProviderChoice from './ProviderChoice';
import EditionChoice from './EditionChoice';

import '../css/components/radio-choices.css';

class RadioChoices extends Component {
	constructor(props) {
		super(props);
		const subject = props.subject;

		this.state = {
			subject
		}
	}

	render() {
		const renderSubject = this.props.subject === 'provider' ? <ProviderChoice /> : <EditionChoice />;

		return (
			<div id="radio-choices">
				{renderSubject}
			</div>
		);
	}
}

export default RadioChoices;
