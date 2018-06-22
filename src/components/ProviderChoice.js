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
					<input 
						type="radio" 
						value="AWS" 
						id="radio-aws"
						checked={this.props.currentProviderChoice === "AWS"} 
						onChange={this.handleChange}
					/>
					<label htmlFor="radio-aws">
						<img src={`${process.env.PUBLIC_URL}/img/aws2.svg`} alt="aws logo"/>

					</label>
				</div>

				{isRuby ?
					<div>
						<input 
							type="radio" 
							value="Cloud66"
							id="radio-cloud"
							checked={this.props.currentProviderChoice === "Cloud66"} 
							onChange={this.handleChange}
						/>
						<label htmlFor="radio-cloud">
							<img src={`${process.env.PUBLIC_URL}/img/cloud66.svg`} alt="cloud 66 logo"/>

						</label>
					</div>
					: null
				}

				<div>
					<input 
						type="radio" 
						value="DigitalOcean"
						id="radio-digitalocean"
						checked={this.props.currentProviderChoice === "DigitalOcean"} 
						onChange={this.handleChange}
					/>
					<label htmlFor="radio-digitalocean">
						<img src={`${process.env.PUBLIC_URL}/img/ocean.svg`} alt="digital ocean"/>

					</label>
				</div>

				{isRuby ?
					<div>
						<input 
							type="radio" 
							value="Heroku"
							id="radio-heroku"
							checked={this.props.currentProviderChoice === "Heroku"} 
							onChange={this.handleChange} 
						/>
						<label htmlFor="radio-heroku">
							<img src={`${process.env.PUBLIC_URL}/img/heroku.svg`} alt="heroku"/>

						</label>
					</div>
					: null
				}

				<div>
					<input 
						type="radio" 
						value="LinuxUnix"
						id="radio-linux"
						checked={this.props.currentProviderChoice === "LinuxUnix"} 
						onChange={this.handleChange} 
					/>
					<label htmlFor="radio-linux">
						<h3>(other)<br />Linux/Unix</h3>
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
