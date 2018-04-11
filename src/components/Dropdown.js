import React, { Component } from 'react';

class Dropdown extends Component {
	render() {
		return (
			<div id="dropdown">
				<span>Current {this.props.name}</span>
				<select name={this.props.name}>
					{this.props.items.map(item => <option value={item} key={item}>{item}</option>)}
				</select>
			</div>
		);
	}
}

export default Dropdown;
