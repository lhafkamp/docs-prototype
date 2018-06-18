import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/components/breadcrumb.css';

class BreadCrumb extends Component {
	render() {
		// TODO cleanly automate BreadCrumb
		const parts = this.props.mainUrl.split('/');
		const url = `/${parts[1]}/${parts[2]}`;

		return (
			<ul id="breadcrumb">
				<li><Link to={url}>{this.props.previousPath}</Link></li>
				<li>{this.props.currentPath}</li>
			</ul>
		);
	}
}

export default BreadCrumb;
