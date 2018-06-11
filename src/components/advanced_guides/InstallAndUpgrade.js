import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

// import components
import CurrentSelection from '../CurrentSelection';
import '../../css/components/advanced-guides-list.css';

class InstallAndUpgrade extends Component {
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
			<div id="advanced-guides-list">
				<h1>Installation, upgrade and uninstallation</h1>
				<CurrentSelection />
				<ul>
					<h2>Basic tasks</h2>
					<li><Link to={'/advanced_guides/install_and_upgrade/installing_passenger/'}>Installing Passenger</Link></li>
					<li><Link to={'/advanced_guides/install_and_upgrade/upgrading_passenger/'}>Upgrading Passenger</Link></li>
					<li><Link to={'/advanced_guides/install_and_upgrade/uninstalling_passenger/'}>Uninstalling Passenger</Link></li>
					<li><Link to={'/advanced_guides/install_and_upgrade/moving_passenger/'}>Moving Passenger to a different directory</Link></li>
				</ul>
				<ul>
					<h2>Advanced tasks</h2>
					<li><Link to={'/advanced_guides/install_and_upgrade/'}>Non-interactive, automatic, headless installs or upgrades</Link></li>
					<li><Link to={'/advanced_guides/install_and_upgrade/'}>Cryptographic verification of installation files</Link></li>
					<li><Link to={'/advanced_guides/install_and_upgrade/'}>Customizing the compilation process</Link></li>
					<li><Link to={'/advanced_guides/install_and_upgrade/'}>Upgrading from open source to Passenger Enterprise</Link></li>
				</ul>
				<ul>
					<h2>Background info</h2>
					<li><Link to={'/advanced_guides/install_and_upgrade/'}>Migrating from Passenger 4 to 5</Link></li>
					<li><Link to={'/advanced_guides/install_and_upgrade/'}>Supported operating systems and languages</Link></li>
					<li><Link to={'/advanced_guides/install_and_upgrade/'}>APT repository (.deb packages)</Link></li>
					<li><Link to={'/advanced_guides/install_and_upgrade/'}>YUM repository (.rpm packages)</Link></li>
				</ul>	
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
		currentIntegration: state.currentIntegration
	}
}

export default connect(mapStateToProps)(InstallAndUpgrade)
