import React, { Component } from 'react';

import { OptionsContext }  from './options-context';

class Test extends Component {
	render() {
		return (
			<div>
				<button onClick={this.props.test}>I AM BUTTON</button>
			</div>
		);
	}
}

export default Test;
