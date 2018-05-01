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
					<span>Getting started</span>
					<li><NavLink to={'/tutorials/getting_started/'} activeClassName="selected">Quickstart</NavLink></li>
					<li><NavLink to={'/tutorials/installation/'} activeClassName="selected">Installation</NavLink></li>
					<li><NavLink to={'/tutorials/the_passenger_command/'} activeClassName="selected">The ‘passenger’ command</NavLink></li>
					<li><NavLink to={'/tutorials/process_management/'} activeClassName="selected">Process management</NavLink></li>
					<li><NavLink to={'/tutorials/reloading_code/'} activeClassName="selected">Reloading code</NavLink></li>
					<li><NavLink to={'/tutorials/the_help_option/'} activeClassName="selected">The --help option</NavLink></li>
				</ul>

				<ul>
					<span>Deployment</span>
					<li>Deploy to production</li>
					<li>Deploying updates</li>
				</ul>
			</div>
		);
	}
}

export default TutorialNav;
