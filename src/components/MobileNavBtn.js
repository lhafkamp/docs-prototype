import React, { Component } from 'react';
import { connect } from 'react-redux';

import './../css/components/nav-btn.css';

class MobileNavBtn extends Component {
	render() {
		return (
			<React.Fragment>
				<button style={{backgroundImage: `url('/img/menulines.svg')`}} onClick={this.props.event} id="nav-btn"><img src={`/img/${this.props.currentLanguage.toLowerCase()}.svg`} alt=""/></button>
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
