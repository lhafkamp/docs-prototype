import React, { Component } from 'react';
import queryString from 'query-string';

import TutorialNav from './TutorialNav';
import AdvancedGuidesNav from './AdvancedGuidesNav';
import Dropdown from './Dropdown';
import MobileNavBtn from './MobileNavBtn';

import '../css/components/left-nav.css';

class LeftNav extends Component {
	constructor() {
		super();
		this.state = {
			languages: ['Ruby', 'Python', 'Node', 'Meteor'],
			integrations: ['Nginx', 'Apache', 'Standalone'],
			parsed: '',
			toggleHide: false
		}
		this.handleClick = this.handleClick.bind(this);
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
				parsed: parsed,
				languages: languageArr,
				integrations: integrationArr
			});
		}
	}

	componentDidMount() {
		window.addEventListener('resize', this.resize.bind(this));
	}

	resize() {
		this.setState({
			toggleHide: window.innerWidth <= 940
		});
	}

	handleClick() {
		if (window.innerWidth <= 940) {
			this.setState(prevState => ({
				toggleHide: !prevState.toggleHide 
			}));
		}		
	}

	render() {
		let navigation = <TutorialNav choices={this.props.choices} event={this.handleClick} />

		if (this.props.choices.location.pathname.includes('/advanced_guides/')) {
			navigation = <AdvancedGuidesNav choices={this.props.choices} event={this.handleClick} />
		}

		return (
			<React.Fragment>
				<div id="left-nav" style={{display: this.state.toggleHide ? 'none' : 'block'}}>
					<div id="left-nav-content">
						<img className="version" src="/img/version.png" alt="gem version"/>
						<Dropdown choices={this.props.choices} name="language" default={this.state.parsed.language || 'Ruby'} items={this.state.languages} />
						<Dropdown choices={this.props.choices} name="integration" default={this.state.parsed.integration || 'Nginx'} items={this.state.integrations} />
						{navigation}
					</div>
				</div>
				<MobileNavBtn event={this.handleClick} toggle={this.state.toggleHide} />
			</React.Fragment>
		);
	}
}

export default LeftNav;
