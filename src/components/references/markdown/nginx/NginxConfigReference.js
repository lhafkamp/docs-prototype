import React, { Component } from 'react';

import NginxApplicationLoading from './chapters/NginxApplicationLoading';
import NginxPerformanceTuning from './chapters/NginxPerformanceTuning';

class NginxConfigReference extends Component {
	render() {
		return (
			<React.Fragment>
				<NginxApplicationLoading />
				<NginxPerformanceTuning />
			</React.Fragment>
		)
	}
}

export default NginxConfigReference;
