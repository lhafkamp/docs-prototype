import React, { Component } from 'react';
import * as actionCreators from '../actions/actionCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class EditionChoice extends Component {
	constructor() {
		super()
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.actions.changeEditionChoice(e.target.value);
	}

	render() {
		return (
			<div>
				<div>
					<input 
						type="radio" 
						value="os"
						id="radio-os"
						checked={this.props.currentEditionChoice === "os"} 
						onChange={this.handleChange}
					/>
					<label htmlFor="radio-os">
						<img src={`${process.env.PUBLIC_URL}/img/passenger_logo.svg`} alt="open-source"/>
						<p>Passenger open source</p>
					</label>
				</div>

				<div>
					<input 
						type="radio" 
						value="enterprise"
						id="radio-enterprise"
						checked={this.props.currentEditionChoice === "enterprise"} 
						onChange={this.handleChange}
					/>
					<label htmlFor="radio-enterprise">
						<img src={`${process.env.PUBLIC_URL}/img/passenger_logo.svg`} alt="enterprise"/>
						<p>Passenger Enterprise</p>
					</label>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentEditionChoice: state.currentEditionChoice
	}
}

function mapDispatchToProps(dispatch) {
	return { 
		actions: bindActionCreators(actionCreators, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditionChoice);
