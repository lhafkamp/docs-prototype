import React, { Component } from 'react';
import Markdown from 'react-markdown';

class NginxLogging extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
<h2 id="logging-and-troubleshooting">Logging & troubleshooting</h2>
`
			} />
		)
	}
}

export default NginxLogging;
