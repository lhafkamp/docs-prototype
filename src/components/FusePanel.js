import React, { Component } from 'react';

import '../css/components/fuse-panel.css';

class FusePanel extends Component {
	render() {
		return (
			<div id="fuse-panel">
				<img src="/img/FP_logo.svg" alt="Fuse Panel logo"/>
				<img className="fuse" src="/img/fuse_panel.png" alt="Fuse Panel"/>
				<a className="light-button" href="https://www.phusionpassenger.com/fuse-panel">Try the beta</a>
				<img src="/img/feedback_placeholder.svg" alt=""/>
			</div>
		);
	}
}

export default FusePanel;
