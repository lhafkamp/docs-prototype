import React, { Component } from 'react';
import * as actionCreators from '../actions/actionCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ProviderChoice extends Component {
	constructor() {
		super()
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.actions.changeProviderChoice(e.target.value);
	}

	render() {
		const isRuby = this.props.currentLanguage === 'Ruby';

		return (
			<div>
				<div>
					<label>
						<input 
							type="radio" 
							value="AWS" 
							checked={this.props.currentProviderChoice === "AWS"} 
							onChange={this.handleChange}
						/>
						Amazon Web Services
					</label>
				</div>

				{isRuby ?
					<div>
						<label>
							<input 
								type="radio" 
								value="Cloud66"
								checked={this.props.currentProviderChoice === "Cloud66"} 
								onChange={this.handleChange}
							/>
							Cloud 66
						</label>
					</div>
					: null
				}

				<div>
					<label>
						<input 
							type="radio" 
							value="DigitalOcean"
							checked={this.props.currentProviderChoice === "DigitalOcean"} 
							onChange={this.handleChange}
						/>
						Digital Ocean
					</label>
				</div>

				{isRuby ?
					<div>
						<label>
							<input 
								type="radio" 
								value="Heroku"
								checked={this.props.currentProviderChoice === "Heroku"} 
								onChange={this.handleChange} 
							/>
							Heroku
						</label>
					</div>
					: null
				}

				<div>
					<label>
						<input 
							type="radio" 
							value="LinuxUnix" 
							checked={this.props.currentProviderChoice === "LinuxUnix"} 
							onChange={this.handleChange} 
						/>
						Generic Linux/Unix deployment tutorial
					</label>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
		currentProviderChoice: state.currentProviderChoice,
	}
}

function mapDispatchToProps(dispatch) {
	return { 
		actions: bindActionCreators(actionCreators, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderChoice);
