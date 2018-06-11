import React, { Component } from 'react';

import TutorialNav from './TutorialNav';
import AdvancedGuidesNav from './AdvancedGuidesNav';

import '../css/components/left-nav.css';

class LeftNav extends Component {
	render() {
		let navigation = <TutorialNav choices={this.props.choices} />

		if (this.props.choices.location.pathname.includes('/advanced_guides/')) {
			navigation = <AdvancedGuidesNav choices={this.props.choices} />
		}

		return (
			<div id="left-nav">
				{navigation}
			</div>
		);
	}
}

export default LeftNav;
