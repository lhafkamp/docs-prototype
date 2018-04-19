import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
				<img className="version" src="/img/version.png" alt="gem version"/>
				<Dropdown choices={this.props.choices} name="language" default='Ruby' items={this.state.languages} />
				<Dropdown choices={this.props.choices} name="integration" default='Nginx' items={this.state.integrations} />

				<ul>
					<span>About Passenger</span>
					<li><NavLink exact to={'/tutorials/what_is_passenger/'} activeClassName="selected">What is Passenger?</NavLink></li>
					<li><NavLink to={'/tutorials/fundamental_concepts/'} activeClassName="selected">Fundamental concepts</NavLink></li>
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
