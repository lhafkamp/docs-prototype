import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

// import components
import CurrentSelection from '../CurrentSelection';
import TableOfContents from '../TableOfContents';
import '../../css/components/advanced-guides-list.css';
import RadioChoices from '../RadioChoices';
import BreadCrumb from '../BreadCrumb';

// import (js) markdown components
import NginxInstallingPassenger from './markdown/nginx/NginxInstallingPassenger';

class InstallingPassenger extends Component {
	componentWillMount() {
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: queryString.stringify({ 
				integration: this.props.currentIntegration,
				language: this.props.currentLanguage,
			})
		});
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div>
				{ /* TODO automate BreadCrumb instead of inserting every name */}
				<BreadCrumb previousPath={'(un)Install & upgrade'} 
										currentPath={'Installing Passenger'} 
										mainUrl={this.props.location.pathname} />
				<h1>Installing Passenger</h1>
				<CurrentSelection />
				<TableOfContents />
				<p>Passenger can be installed through a variety of installation methods. We recommend using an operating system-specific installation method because it has better OS integration, but you can also choose a more generic installation method.</p>
				<div className="info">
					Are you looking to install Passenger on <img className="heroku" alt="Heroku" src="/img/heroku.svg" />? Please follow <a href="https://github.com/phusion/passenger-ruby-heroku-demo">the Heroku guide</a>.
				</div>
				<h2>Step 1: Select a Passenger edition</h2>
				<RadioChoices subject="edition" />
				<NginxInstallingPassenger enterprise={this.props.currentEditionChoice} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
		currentIntegration: state.currentIntegration,
		currentEditionChoice: state.currentEditionChoice
	}
}

export default connect(mapStateToProps)(InstallingPassenger)
