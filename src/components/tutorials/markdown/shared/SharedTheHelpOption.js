import React, { Component } from 'react';
import Markdown from 'react-markdown';

class SharedTheHelpOption extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
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
			} />
		)
	}
}

export default SharedTheHelpOption;
