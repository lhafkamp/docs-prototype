import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/components/header.css';

class Header extends Component {
	render() {
		return (
			<div id="header">
				<ul>
					<a href="https://phusionpassenger.com/"><img src="/img/passenger_logo.svg" alt="home" /></a>
					<li><NavLink to='/tutorials/' activeClassName="selected">Tutorials</NavLink></li>
					<li><NavLink to='/advanced/' activeClassName="selected">Advanced guides</NavLink></li>
					<li><NavLink to='/references/' activeClassName="selected">References</NavLink></li>
					<li><a href="https://www.phusionpassenger.com/library/">Old docs</a></li>
					{/* <a href="https://www.phusionpassenger.com/install" className="light-button">Free trial</a> */}
				</ul>
			</div>
		);
	}
}

export default Header;
