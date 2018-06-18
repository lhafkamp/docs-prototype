import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../css/components/page-not-found.css';

class PageNotFound extends Component {
	render() {
		return (
			<div id="page-not-found">
				<h1 className="solo-h1">Sorry, page not found</h1>
				<p>You have seem to be directed to a page that doesn't exist. Please contact us at <a href="mailto:info@phusionpassenger.com">info@phusionpassenger.com</a> if you think this page should exist.</p>
				<Link to="/" className="dark-button">Go to the homepage</Link>
			</div>
		);
	}
}

export default PageNotFound;
