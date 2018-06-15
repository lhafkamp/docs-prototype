import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ReferencesNav extends Component {
	render() {
		return (
			<ul>
				<span>References</span>
				<li><NavLink to={'/references/config_reference/'} activeClassName="selected">Config references</NavLink></li>
				<li><NavLink to={'/references/hooks/'} activeClassName="selected">Hooks</NavLink></li>
			</ul>
		);
	}
}

export default ReferencesNav;
