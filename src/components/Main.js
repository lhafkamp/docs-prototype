import React, { Component } from 'react';

import Header from './Header';
import LeftNav from './LeftNav.js';
import MainContent from './MainContent';
import RightContent from './RightContent';

import { OptionsContext }  from './options-context';

class Main extends Component {
	constructor() {
		super();

		this.changeLanguage = () => {
			this.setState({
				currentLanguage: 'Python'
			});
		}

		this.state = {
		  currentLanguage: 'Ruby',
			changeLanguage: this.changeLanguage
		};
	}

	render() {
		return (
			<div>
				<Header />
				<div id="content">
					<OptionsContext.Provider value={this.state}>
						<LeftNav />
						<MainContent />
						<RightContent />
					</OptionsContext.Provider>
				</div>
			</div>
		);
	}
}

export default Main;
