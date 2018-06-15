import React, { Component } from 'react';
import Markdown from 'react-markdown';

class NginxSecurity extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
<h2 id="security">Security</h2>
`
			} />
		)
	}
}

export default NginxSecurity;
