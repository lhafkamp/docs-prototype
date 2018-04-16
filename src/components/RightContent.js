import React, { Component } from 'react';

import FusePanel from './FusePanel';
import '../css/components/right-content.css';

class RightContent extends Component {
	render() {
		return (
			<div id="right-content">
				<FusePanel />
			</div>
		);
	}
}

export default RightContent;
