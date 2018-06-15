import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';
import LeftNav from './LeftNav.js';
import MainContent from './MainNavigation';
import RightContent from './RightContent';

class Main extends Component {
	render() {
		return (
			<div>
				<Header />
				<div id="content">
					<LeftNav choices={this.props} />
					<MainContent choices={this.props} />
					<RightContent choices={this.props} />
				</div>
				<Footer />
			</div>
		);
	}
}

export default Main;
