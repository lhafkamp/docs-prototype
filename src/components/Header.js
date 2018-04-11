import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/components/header.css';

class Header extends Component {
	render() {
		return (
			<div id="header">
				<ul>
					<a href="http://phusionpassenger.com/"><img src="/img/passenger_logo.svg" alt="home" /></a>
					<li><Link to='/tutorials'>Tutorials</Link></li>
					<li><Link to='/advanced'>Advanced guides</Link></li>
					<li><Link to='/references'>References</Link></li>
				</ul>
			</div>
		);
	}
}

export default Header;
