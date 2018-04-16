import React, { Component } from 'react';

import Dropdown from './Dropdown';
import '../css/components/tutorial-nav.css';

class TutorialNav extends Component {
	constructor() {
		super();
		this.state = {
			languages: ['Ruby', 'Python', 'Node', 'Meteor'],
			integrations: ['Nginx', 'Apache', 'Standalone']
		}
	}

	render() {
		return (
			<div id="tutorial-nav">
				<img class="version" src="/img/version.png" alt="gem version"/>
				<Dropdown name="language" default='Ruby' items={this.state.languages} />
				<Dropdown name="integration" default='Nginx' items={this.state.integrations} />

				<ul>
					<span>About Passenger</span>
					<li>What is Passenger?</li>
					<li>Fundamental concepts</li>
				</ul>

				<ul>
					<span>Quickstart</span>
					<li>Getting started</li>
					<li>The ‘Passenger’ command</li>
					<li>Process management</li>
					<li>Reloading code</li>
					<li>The ‘Help’ command</li>
				</ul>

				<ul>
					<span>Deployment</span>
					<li>Deploy to production</li>
				</ul>
			</div>
		);
	}
}

export default TutorialNav;
