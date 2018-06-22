import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/components/header.css';

class Header extends Component {
	render() {
		const style = { backgroundImage: `url(${process.env.PUBLIC_URL}/img/search_icon.svg)` };

		return (
			<div id="header">
				<div>
					<ul>
						<a href="https://phusionpassenger.com/"><img src={`${process.env.PUBLIC_URL}/img/passenger_logo.svg`} alt="home" /></a>
						<li><NavLink to='/tutorials/' activeClassName="selected">Tutorials</NavLink></li>
						<li><NavLink to='/advanced_guides/' activeClassName="selected">Advanced guides</NavLink></li>
						<li><NavLink to='/references/' activeClassName="selected">References</NavLink></li>
						<li><a href="https://www.phusionpassenger.com/library/">Old docs</a></li>
					</ul>
					<img className="small-screen-search" src={`${process.env.PUBLIC_URL}/img/search_icon.svg`}  alt="search docs.." />
					<input type="search" placeholder="search docs.." style={style} />
				</div>
			</div>
		);
	}
}

export default Header;
