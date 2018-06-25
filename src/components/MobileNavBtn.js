import React, { Component } from 'react';
import { connect } from 'react-redux';

import './../css/components/nav-btn.css';

class MobileNavBtn extends Component {
	render() {
		return (
			<React.Fragment>
				<button style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/menulines.svg)` }} onClick={this.props.event} id="nav-btn"><img src={`${process.env.PUBLIC_URL}/img/${this.props.currentLanguage.toLowerCase()}.svg`} alt={this.props.currentLanguage} /></button>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage
	}
}

export default connect(mapStateToProps)(MobileNavBtn);
