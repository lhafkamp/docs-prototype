import React, { Component } from 'react';

import NginxApplicationLoading from './chapters/NginxApplicationLoading';
import NginxPerformanceTuning from './chapters/NginxPerformanceTuning';
import NginxSecurity from './chapters/NginxSecurity';
import NginxRequest from './chapters/NginxRequest';
import NginxLogging from './chapters/NginxLogging';
import NginxDeprecated from './chapters/NginxDeprecated';

class NginxConfigReference extends Component {
	render() {
		return (
			<React.Fragment>
				<NginxApplicationLoading />
				<NginxPerformanceTuning />
				<NginxSecurity />
				<NginxRequest />
				<NginxLogging />
				<NginxDeprecated />
			</React.Fragment>
		)
	}
}

export default NginxConfigReference;
