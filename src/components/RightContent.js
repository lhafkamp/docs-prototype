import React, { Component } from 'react';

import FusePanel from './FusePanel';
import RightContentToC from './RightContentToC';

import '../css/components/right-content.css';

class RightContent extends Component {
	render() {
		let rightContent = <FusePanel />;

		if (this.props.choices.location.pathname.includes('/references/config_reference/')) {
			rightContent = <RightContentToC />
		}

		return (
			<div id="right-content">
				{rightContent}
			</div>
		);
	}
}

export default RightContent;
