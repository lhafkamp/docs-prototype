import React, { Component } from 'react';

// import components
import CurrentSelection from '../CurrentSelection';
import TableOfContents from '../TableOfContents';

// import (js) markdown components
import NginxBody from './markdown/nginx/NginxConfigReference';

import '../../css/components/references.css';

class ConfigReference extends Component {
	render() {
		return (
			<div id="references">
				<h1>Configuration reference</h1>
				<CurrentSelection />
				<TableOfContents />
				<NginxBody />
			</div>
		);
	}
}

export default ConfigReference;
