import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import queryString from 'query-string';

import NextStep from '../NextStep';

class TheHelpOption extends Component {
	componentWillMount() {
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: queryString.stringify({ 
				integration: this.props.currentIntegration,
				language: this.props.currentLanguage,
			})
		});
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		// language/integration text based variables
		let body = '';

		// markdown variables
		const header = `
# Help!`

		const subTitle = `
We have done our best to make Passenger user-friendly, but it is still possible for users to get stuck or to need help. So before we conclude this tutorial, we will teach you how to get help.`

		const rubyBody = `
<a name="help_option"></a>

## The \`--help\` option

Although this Library is a good source of information on using Passenger, you do not have to consult this Library for everything. Passenger is **self-documenting**: every Passenger command supports the \`--help\` option, which will provide you with basic information about the command, its behavior and its syntax.

Here is an example of \`passenger --help\`:

<pre class="highlight">
<span><span class="prompt">$</span> cd /path-to-your-app</span>
<span><span class="prompt">$</span> bundle exec passenger --help</span>
<span class="output">Phusion Passenger Standalone, the easiest way to run web apps.

Available commands:

  passenger start      Start Phusion Passenger Standalone.
  passenger stop       Stop a Phusion Passenger instance.
  passenger status     Show the status of a running Phusion Passenger instance.

Run 'passenger &lt;COMMAND&gt; --help' for more information about each command.</span></pre>

Many Passenger commands support subcommands. These subcommands, too, support \`--help\`. The above output already suggested that you can run \`passenger start --help\`:

<pre class="highlight">
<span><span class="prompt">$</span> cd /path-to-your-app</span>
<span><span class="prompt">$</span> bundle exec passenger --help</span>
<span class="output">Usage: passenger start [DIRECTORY] [OPTIONS]
Starts Passenger Standalone and serve one or more web applications.

Server options:
    -a, --address HOST               Bind to the given address.
                                     Default: 0.0.0.0
    -p, --port NUMBER                Use the given port number. Default: 3000
...</span></pre>

So if you want to know what a command does and whether its behavior can be modified, please do not hestitate to pass \`--help\`.
`

		const pythonBody = `
<a name="help_option"></a>

## The \`--help\` option

Although this Library is a good source of information on using Passenger, you do not have to consult this Library for everything. Passenger is **self-documenting**: every Passenger command supports the \`--help\` option, which will provide you with basic information about the command, its behavior and its syntax.

Here is an example of \`passenger --help\`:

<pre class="highlight">
<span><span class="prompt">$</span> passenger --help</span>
<span class="output">Phusion Passenger Standalone, the easiest way to run web apps.

Available commands:

  passenger start      Start Phusion Passenger Standalone.
  passenger stop       Stop a Phusion Passenger instance.
  passenger status     Show the status of a running Phusion Passenger instance.

Run 'passenger &lt;COMMAND&gt; --help' for more information about each command.</span></pre>

Many Passenger commands support subcommands. These subcommands, too, support \`--help\`. The above output already suggested that you can run \`passenger start --help\`:

<pre class="highlight">
<span><span class="prompt">$</span> passenger start --help</span>
<span class="output">Usage: passenger start [DIRECTORY] [OPTIONS]
Starts Passenger Standalone and serve one or more web applications.

Server options:
    -a, --address HOST               Bind to the given address.
                                     Default: 0.0.0.0
    -p, --port NUMBER                Use the given port number. Default: 3000
...</span></pre>

So if you want to know what a command does and whether its behavior can be modified, please do not hestitate to pass \`--help\`.
`

		switch (this.props.currentLanguage) {
		default:
		case 'Ruby':
			body = rubyBody;
			break;
		case 'Python':
			body = pythonBody;
			break;
		}

		return (
			<div>
				<Markdown source={header} />
				<Markdown source={subTitle} />
				<Markdown escapeHtml={false} source={body} />
				<NextStep name="Deploy to production" path="/tutorials/deploy_to_production/" />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
		currentIntegration: state.currentIntegration
	}
}

export default connect(mapStateToProps)(TheHelpOption);
