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
					<label>
						<input 
							type="radio" 
							value="os" 
							checked={this.props.currentEditionChoice === "os"} 
							onChange={this.handleChange}
						/>
						Passenger open source
					</label>
				</div>

				<div>
					<label>
						<input 
							type="radio" 
							value="enterprise"
							checked={this.props.currentEditionChoice === "enterprise"} 
							onChange={this.handleChange}
						/>
						Passenger Enterprise
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
