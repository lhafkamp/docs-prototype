import React, { Component } from 'react';

import Header from './Header';
import LeftNav from './LeftNav.js';
import MainContent from './MainContent';
import RightContent from './RightContent';

class Main extends Component {
	render() {
		return (
			<div>
				<Header />
				<div id="content">
					<LeftNav choices={this.props} />
					<MainContent choices={this.props} />
					<RightContent />
				</div>
			</div>
		);
	}
}

export default Main;
