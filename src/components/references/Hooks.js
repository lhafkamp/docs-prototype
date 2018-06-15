import React, { Component } from 'react';

// import components
import TableOfContents from '../TableOfContents';

// import (js) markdown components
import Body from './markdown/shared/SharedHooks';

import '../../css/components/hooks.css';

class Hooks extends Component {
	render() {
		return (
			<div id="hooks">
				<h1 className="solo-h1">Passenger Hooks</h1>
				<p>Passenger provides a powerful but simple hooking system, which allows you to extend many aspects of Passenger's behavior. The hooking system works by executing commands during certain events. Event parameters are passed to the command in the form of environment variables.</p>
				<p>Hooks are available since Passenger version 4.0.28.</p>
				<TableOfContents />
				<Body />
			</div>
		);
	}
}

export default Hooks;
