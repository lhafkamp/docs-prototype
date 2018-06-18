import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/components/breadcrumb.css';

class BreadCrumb extends Component {
	render() {
		return (
			<ul id="breadcrumb">
				<li><Link to={this.props.mainUrl}>{this.props.previous}</Link></li>
				<li>{this.props.current}</li>
			</ul>
		);
	}
}

export default BreadCrumb;
