import React, { Component } from 'react';

import TutorialNav from './TutorialNav';
import '../css/components/left-nav.css';

class LeftNav extends Component {
	render() {
		return (
			<div id="left-nav">
				<TutorialNav />
			</div>
		);
	}
}

export default LeftNav;
