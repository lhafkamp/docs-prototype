import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';

class AdvancedGuidesNav extends Component {
	render() {
		return (
			<ul>
				<span>Advanced guides</span>
				<li><NavLink exact to={'/advanced_guides/install_and_upgrade/'} activeClassName="selected">(un)Install & upgrade</NavLink></li>
				<li><NavLink exact to={'/advanced_guides/developing_with_passenger/'} activeClassName="selected">Developing with Passenger</NavLink></li>
				<li><NavLink exact to={'/advanced_guides/config_and_optimization/'} activeClassName="selected">Config and optimization</NavLink></li>
				<li><NavLink exact to={'/advanced_guides/deployment_and_scaling/'} activeClassName="selected">Deployment and scaling</NavLink></li>
				<li><NavLink exact to={'/advanced_guides/docker_support/'} activeClassName="selected">Docker support</NavLink></li>
				<li><NavLink exact to={'/advanced_guides/troubleshooting/'} activeClassName="selected">Troubleshooting</NavLink></li>
				<li><NavLink exact to={'/advanced_guides/in_depth/'} activeClassName="selected">In-depth</NavLink></li>
			</ul>
		);
	}
}

export default AdvancedGuidesNav;
