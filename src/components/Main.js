import React, { Component } from 'react';
import { Router } from 'react-router-dom';

import Header from './Header';
import LeftNav from './LeftNav.js';
import MainContent from './MainContent';
import RightContent from './RightContent';

class Main extends Component {
	componentDidUpdate(prevProps) {
		if (prevProps.currentLanguage !== this.props.currentLanguage) {
			// url change
		}
	}

	render() {
		return (
			<div>
				<Header />
				<div id="content">
					<LeftNav choices={this.props} />
					<MainContent />
					<RightContent />
				</div>
			</div>
		);
	}
}

export default Main;
