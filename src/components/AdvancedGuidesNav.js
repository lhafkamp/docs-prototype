import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';

import Dropdown from './Dropdown';
import '../css/components/left-nav-content.css';

class AdvancedGuidesNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			languages: ['Ruby', 'Python', 'Node', 'Meteor'],
			integrations: ['Nginx', 'Apache', 'Standalone'],
			parsed: queryString.parse(this.props.choices.location.search)
		}
	}

	componentWillMount() {
		if (this.props.choices.location.search !== '') {
			const parsed = queryString.parse(this.props.choices.location.search);
			const languages = ['Ruby', 'Python', 'Node', 'Meteor'];
			const integrations = ['Nginx', 'Apache', 'Standalone'];

			if (!languages.includes(parsed.language)) {
				parsed.language = 'Ruby';
			}

			if (!integrations.includes(parsed.integration)) {
				parsed.integration = 'Nginx';
			}

			// order the dropdown selections based on the URL
			const parsedLanguages = [parsed.language, ...languages]
			const parsedIntegrations = [parsed.integration, ...integrations]
			const languageArr = [...new Set(parsedLanguages)]
			const integrationArr = [...new Set(parsedIntegrations)]
			
			this.setState({
				languages: languageArr,
				integrations: integrationArr
			});
		}
	}

	render() {
		return (
			<div id="left-nav-content">
				<img className="version" src="/img/version.png" alt="gem version"/>
				<Dropdown choices={this.props.choices} name="language" default={this.state.parsed.language || 'Ruby'} items={this.state.languages} />
				<Dropdown choices={this.props.choices} name="integration" default={this.state.parsed.integration || 'Nginx'} items={this.state.integrations} />

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
			</div>
		);
	}
}

export default AdvancedGuidesNav;
