import React, { Component } from 'react';

class Dropdown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.default,
			style: ''
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.value !== this.state.value) {
			let logo;

			switch (this.state.value) {
			default:
			case 'Ruby':
				logo = '/img/ruby.svg';
				break;
			case 'Python':
				logo = '/img/python.svg';
				break;
			case 'Node':
				logo = '/img/node.svg';
				break;
			case 'Meteor':
				logo = '/img/meteor.svg';
				break;
			case 'Nginx':
				logo = '/img/nginx.svg';
				break;
			case 'Apache':
				logo = '/img/apache.svg';
				break;
			case 'Standalone':
				logo = '/img/passenger_logo.svg';
				break;
			}

			this.setState({
				style: logo
			})
		}
	}

	render() {
		let style;

		style = {
			backgroundImage: `url(${this.state.style})`
		}

		if (this.state.value === 'Ruby') {
			style = { backgroundImage: `url(/img/ruby.svg)` }
		} else if (this.state.value === 'Nginx') {
			style = { backgroundImage: `url(/img/nginx.svg)` }
		}

		return (
			<div id="dropdown">
				<span>Current {this.props.name}</span>
				<select name={this.props.name} style={style} onChange={this.handleChange}>
					{this.props.items.map(item => <option value={item} key={item}>{item}</option>)}
				</select>
				<span class="arrow-down"></span>
			</div>
		);
	}
}

export default Dropdown;
