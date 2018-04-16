import React, { Component } from 'react';

import '../css/components/fuse-panel.css';

class FusePanel extends Component {
	render() {
		return (
			<div id="fuse-panel">
				<img src="/img/FP_logo.svg" alt="Fuse Panel logo"/>
				<img class="fuse" src="/img/fuse_panel.png" alt="Fuse Panel"/>
				<a class="light-button" href="https://www.phusionpassenger.com/fuse-panel">Try the beta</a>
			</div>
		);
	}
}

export default FusePanel;
