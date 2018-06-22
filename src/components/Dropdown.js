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

		switch (e.target.value) {
		default:
		case 'Ruby':
		case 'Python':
		case 'Node':
		case 'Meteor':
			this.props.choices.changeLanguage(e.target.value);
			break;
		case 'Nginx':
		case 'Apache':
		case 'Standalone':
			this.props.choices.changeIntegration(e.target.value);
			break;
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.value !== this.state.value) {
			let logo;

			switch (this.state.value) {
			default:
			case 'Ruby':
				logo = `${process.env.PUBLIC_URL}/img/ruby.svg`;
				break;
			case 'Python':
				logo = `${process.env.PUBLIC_URL}/img/python.svg`;
				break;
			case 'Node':
				logo = `${process.env.PUBLIC_URL}/img/node.svg`;
				break;
			case 'Meteor':
				logo = `${process.env.PUBLIC_URL}/img/meteor.svg`;
				break;
			case 'Nginx':
				logo = `${process.env.PUBLIC_URL}/img/nginx.svg`;
				break;
			case 'Apache':
				logo = `${process.env.PUBLIC_URL}/img/apache.svg`;
				break;
			case 'Standalone':
				logo = `${process.env.PUBLIC_URL}/img/passenger_logo.svg`;
				break;
			}

			this.setState({
				style: logo
			});
		}
	}

	render() {
		let style;
		let logo = this.state.value;
		const languages = ['Ruby', 'Python', 'Node', 'Meteor'];
		const integrations = ['Nginx', 'Apache', 'Standalone'];

		if (this.props.name === 'language' && !languages.includes(this.state.value)) {
			logo = 'Ruby'
		}

		if (this.props.name === 'integration' && !integrations.includes(this.state.value)) {
			logo = 'Nginx'
		}

		switch (logo) {
		default:
		case 'Ruby':
			style = { backgroundImage: `url(${process.env.PUBLIC_URL}/img/ruby.svg)`};
			break;
		case 'Python':
			style = { backgroundImage: `url(${process.env.PUBLIC_URL}/img/python.svg)`};
			break;
		case 'Node':
			style = { backgroundImage: `url(${process.env.PUBLIC_URL}/img/node.svg)`};
			break;
		case 'Meteor':
			style = { backgroundImage: `url(${process.env.PUBLIC_URL}/img/meteor.svg)`};
			break;
		case 'Nginx':
			style = { backgroundImage: `url(${process.env.PUBLIC_URL}/img/nginx.svg)`};
			break;
		case 'Apache':
			style = { backgroundImage: `url(${process.env.PUBLIC_URL}/img/apache.svg)`};
			break;
		case 'Standalone':
			style = { backgroundImage: `url(${process.env.PUBLIC_URL}/img/passenger_logo.svg)`};
			break;
		}

		return (
			<div id="dropdown">
				<span>Current {this.props.name}</span>
				<select name={this.props.name} style={style} onChange={this.handleChange}>
					{this.props.items.map(item => <option value={item} key={item}>{item}</option>)}
				</select>
				<span className="arrow-down"></span>
			</div>
		);
	}
}

export default Dropdown;
