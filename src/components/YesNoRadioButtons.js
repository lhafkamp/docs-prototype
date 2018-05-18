import React, { Component } from 'react';

import '../css/components/yes-no-radio.css';

class YesNoRadioButtons extends Component {
	render() {
		return (
			<div id="yes-no-radio">
				<input 
					type="radio" 
					value="yes" 
					id="yes"
					checked={this.props.choice === 'yes'}
					onChange={this.props.action}
				/>
				<label htmlFor="yes">
					<span className="radio">Yes</span>
				</label>

				<input 
					type="radio" 
					value="no" 
					id="no"
					checked={this.props.choice === 'no'}
					onChange={this.props.action}
				/>
				<label htmlFor="no">
					<span className="radio">No</span>
				</label>
			</div>
		)
	}
}

export default YesNoRadioButtons;
