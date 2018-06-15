import React, { Component } from 'react';
import Markdown from 'react-markdown';

class NginxDeprecated extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
<h2 id="deprecated-or-removed-options">Deprecated or removed options</h2>
`
			} />
		)
	}
}

export default NginxDeprecated;
