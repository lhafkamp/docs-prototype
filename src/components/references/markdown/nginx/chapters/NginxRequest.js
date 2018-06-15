import React, { Component } from 'react';
import Markdown from 'react-markdown';

class NginxRequest extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
<h2 id="request-response-customization">Request / response customization</h2>
`
			} />
		)
	}
}

export default NginxRequest;
