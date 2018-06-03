import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import queryString from 'query-string';

import CurrentSelection from '../CurrentSelection';
import TableOfContents from '../TableOfContents';
import NextStep from '../NextStep';

class ThePassengerCommand extends Component {
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
# The 'passenger' command`

		const subTitle = `
The passenger command starts or stops a \`Passenger\` server in Standalone mode. In this section we will teach you how to use this command.`

		const rubyBody = `
## Starting a server

\`passenger\` is the most basic command, and is often used during development. If you have read [Getting started](../../start/${this.props.currentLanguage}.html) then you have already encountered this command. Throughout this basics tutorial, we will encounter this command often.

You begin using Passenger Standalone by starting a Passenger Standalone server. This can be done with the \`passenger start\` command.

<pre class="highlight">
<span class="prompt">$ </span>bundle exec passenger start
<span class="output">======= Phusion Passenger Standalone web server started =======
PID file: /Users/phusion/myapp/tmp/pids/passenger.3000.pid.   <span class="label label-info">1</span>
Log file: /Users/phusion/myapp/log/passenger.3000.log.        <span class="label label-info">2</span>
Environment: development                     <span class="label label-info">3</span>
Accessible via: http://0.0.0.0:3000/         <span class="label label-info">4</span>

You can stop Phusion Passenger Standalone by pressing Ctrl-C.
===============================================================
</span></pre>

During startup, Passenger prints its runtime parameters to the console. There are several things you see here:

 1. Passenger has created a PID file. The PID file contains the process ID of the Passenger instance, and allows other \`passenger\` subcommands to know which process to operate on.
 2. Passenger has created a log file. We will talk about logging later.
 3. Passenger has started your app under the \`development\` environment. This means that it has set the environment variables \`RAILS_ENV\` and \`RACK_ENV\` to the value \`development\`.

Various Ruby web frameworks -- in particular Rails -- use the value of one of these environment variables to [adjust their behavior](http://guides.rubyonrails.org/configuring.html#rails-environment-settings).

<div class="note">
  <h3 id="bundle-exec-rails-server">You can also use "bundle exec rails server"</h3>
  <p>If you use Rails, then you can also run <code>bundle exec rails server</code>. As long as you have the above Gemfile entry, that command will start a Passenger-based server.</p>
</div>

## Logs

Passenger itself logs things. The application itself may also log things. Here we will describe how logs are handled.

You have learned that Passenger Standalone has a log file. Your application probably logs things to a log file.
For example, Rails apps log to \`log/development.log\` when run in development mode.
These are two distinct log files: the Passenger log file is not the application log file.

Your application may also print to stdout or stderr. Passenger also considers these messages as logs.

Passenger handles all of these logs as follows:

 * Passenger's own logs are printed to the Passenger log file.
 * Anything the application logs to its log file, will end up there only, not in the Passenger log file.
 * Anything the application prints to stdout and stderr, are printed to the Passenger log file.
 * Passenger's own logs, the application log file, and anything the application prints to stdout and stderr, are printed to the terminal.

   There is just one caveat here. Passenger can only print the application log file to the terminal, if the log file is named \`log/<ENVIRONMENT NAME>.log\`. This is true for most Rails apps, at least.

## Stopping the server

If you stop Passenger, Passenger will stop your app.

There are two ways to stop the server. The first is by pressing Ctrl-C in the terminal. The second way is by running \`passenger stop\`.

### Ctrl-C

Let us try out the Ctrl-C method. Go to the terminal where the Passenger server was started, and press Ctrl-C there. You should see that it stops.

<pre class="highlight"><span class="c"># This is what you typed before:
$ bundle exec passenger start
...</span>

<span class="c"># Now press Ctrl-C:</span>
<span class="output">^C
Stopping web server... done!</span></pre>

### 'passenger stop'

Let us also try out the \`passenger stop\` command. First, start Passenger up again:

<pre class="highlight"><span class="prompt">$ </span>bundle exec passenger start</pre>

Open a seperate terminal, change the working directory to your application, and run \`passenger stop\`.

<pre class="highlight"><span class="prompt">$ </span>cd /path-to-your-app
<span class="prompt">$ </span>bundle exec passenger stop</pre>

When you switch back to the first terminal, you should see that Passenger has indeed stopped.

## Configuration

### Command line options

Most configuration is done by customizing the options passed to the \`passenger\` command. For example, you can customize the port that Passenger listens on using \`--port\`, and you can customize the location of the log file using \`--log-file\`.

Here is an example invocation:

<pre class="highlight"><span class="prompt">$ </span>bundle exec passenger start --port 4000 --log-file awesome.log
<span class="output">======= Phusion Passenger Standalone web server started =======
PID file: /PID file: /Users/phusion/myapp/tmp/pids/passenger.4000.pid
Log file: /Log file: /Users/phusion/myapp/awesome.log
Environment: development
Accessible via: http://0.0.0.0:4000/

You can stop Phusion Passenger Standalone by pressing Ctrl-C.
===============================================================</span></pre>

Many more configuration options are available. You can see all available options by passing \`--help\`:

<pre class="highlight"><span class="prompt">$ </span>bundle exec passenger start --help
<span class="output">Usage: passenger start [DIRECTORY] [OPTIONS]
Starts Phusion Passenger Standalone and serve one or more web applications.

Server options:
    -a, --address HOST               Bind to the given address.
                                     Default: 0.0.0.0
    -p, --port NUMBER                Use the given port number. Default: 3000
...</span></pre>

<!-- TODO: link to command line options reference -->

### Passengerfile.json

Command line options are great for temporarily changing a parameter, but if you want to persist a change, then it is best to store configuration in \`Passengerfile.json\`. Passenger Standalone automatically loads configuration from that file if it exists.

The configuration file format is JSON. You can find more information about the configuration file (such as its precedence compared to environment variables and command line options) in the [Configuration introduction](/config/standalone/intro.html').

Here is an example Passengerfile.json which customizes the port, log file path and environment name:

~~~json
{
    "port": 4000,
    "log_file": "awesome.log",
    "environment": "staging"
}
~~~

All command line options have a configuration file equivalent. Just omit the initial two dashes \`--\`, and replace other dashes \`-\` with underscores \`_\`.
`

		const pythonBody = `
## Starting a server

\`passenger\` is the most basic command, and is often used during development. If you have read [Getting started](../../start/${this.props.currentLanguage}.html) then you have already encountered this command. Throughout this basics tutorial, we will encounter this command often.

You begin using Passenger Standalone by starting a Passenger Standalone server. This can be done with the \`passenger start\` command.

<pre class="highlight">
<span class="prompt">$ </span>passenger start
<span class="output">======= Phusion Passenger Standalone web server started =======
PID file: /Users/phusion/myapp/tmp/pids/passenger.3000.pid.   <span class="label label-info">1</span>
Log file: /Users/phusion/myapp/log/passenger.3000.log.        <span class="label label-info">2</span>
Environment: development                     <span class="label label-info">3</span>
Accessible via: http://0.0.0.0:3000/         <span class="label label-info">4</span>

You can stop Phusion Passenger Standalone by pressing Ctrl-C.
===============================================================
</span></pre>

During startup, Passenger prints its runtime parameters to the console. There are several things you see here:

 1. Passenger has created a PID file. The PID file contains the process ID of the Passenger instance, and allows other \`passenger\` subcommands to know which process to operate on.
 2. Passenger has created a log file. We will talk about logging later.
 3. Passenger has started your app under the \`development\` environment. This means that it has set the environment variable \`PASSENGER_APP_ENV\` to the value \`development\`.
 4. Passenger is serving your app on [http://0.0.0.0:3000/](http://0.0.0.0:3000/).

If you go to http://0.0.0.0:3000/, you will see your application:

<pre class="highlight"><span class="prompt">$ </span>curl http://0.0.0.0:3000/
<span class="output">...your app's front page HTML...</span></pre>

All of these parameters can be customized. We will talk about customization later.

## Logs

Passenger itself logs things. The application itself may also log things. Here we will describe how logs are handled.

You have learned that Passenger Standalone has a log file. Your application probably logs things to a log file.
For example, Rails apps log to \`log/development.log\` when run in development mode.
These are two distinct log files: the Passenger log file is not the application log file.

Your application may also print to stdout or stderr. Passenger also considers these messages as logs.

Passenger handles all of these logs as follows:

 * Passenger's own logs are printed to the Passenger log file.
 * Anything the application logs to its log file, will end up there only, not in the Passenger log file.
 * Anything the application prints to stdout and stderr, are printed to the Passenger log file.
 * Passenger's own logs, the application log file, and anything the application prints to stdout and stderr, are printed to the terminal.

   There is just one caveat here. Passenger can only print the application log file to the terminal, if the log file is named \`log/<ENVIRONMENT NAME>.log\`. This is true for most Rails apps, at least.

## Stopping the server

If you stop Passenger, Passenger will stop your app.

There are two ways to stop the server. The first is by pressing Ctrl-C in the terminal. The second way is by running \`passenger stop\`.

### Ctrl-C

Let us try out the Ctrl-C method. Go to the terminal where the Passenger server was started, and press Ctrl-C there. You should see that it stops.

<pre class="highlight"><span class="c"># This is what you typed before:
$ bundle exec passenger start
...</span>

<span class="c"># Now press Ctrl-C:</span>
<span class="output">^C
Stopping web server... done!</span></pre>

### 'passenger stop'

Let us also try out the \`passenger stop\` command. First, start Passenger up again:

<pre class="highlight"><span class="prompt">$ </span>passenger start</pre>

Open a seperate terminal, change the working directory to your application, and run \`passenger stop\`.

<pre class="highlight"><span class="prompt">$ </span>cd /path-to-your-app
<span class="prompt">$ </span>passenger stop</pre>

When you switch back to the first terminal, you should see that Passenger has indeed stopped.

## Configuration

### Command line options

Most configuration is done by customizing the options passed to the \`passenger\` command. For example, you can customize the port that Passenger listens on using \`--port\`, and you can customize the location of the log file using \`--log-file\`.

Here is an example invocation:

<pre class="highlight"><span class="prompt">$ </span>passenger start --port 4000 --log-file awesome.log
<span class="output">======= Phusion Passenger Standalone web server started =======
PID file: /PID file: /Users/phusion/myapp/tmp/pids/passenger.4000.pid
Log file: /Log file: /Users/phusion/myapp/awesome.log
Environment: development
Accessible via: http://0.0.0.0:4000/

You can stop Phusion Passenger Standalone by pressing Ctrl-C.
===============================================================</span></pre>

Many more configuration options are available. You can see all available options by passing \`--help\`:

<pre class="highlight"><span class="prompt">$ </span>passenger start --help
<span class="output">Usage: passenger start [DIRECTORY] [OPTIONS]
Starts Phusion Passenger Standalone and serve one or more web applications.

Server options:
    -a, --address HOST               Bind to the given address.
                                     Default: 0.0.0.0
    -p, --port NUMBER                Use the given port number. Default: 3000
...</span></pre>

<!-- TODO: link to command line options reference -->

### Passengerfile.json

Command line options are great for temporarily changing a parameter, but if you want to persist a change, then it is best to store configuration in \`Passengerfile.json\`. Passenger Standalone automatically loads configuration from that file if it exists.

The configuration file format is JSON. You can find more information about the configuration file (such as its precedence compared to environment variables and command line options) in the [Configuration introduction](/config/standalone/intro.html').

Here is an example Passengerfile.json which customizes the port, log file path and environment name:

~~~json
{
    "port": 4000,
    "log_file": "awesome.log",
    "environment": "staging"
}
~~~

All command line options have a configuration file equivalent. Just omit the initial two dashes \`--\`, and replace other dashes \`-\` with underscores \`_\`.
`

const nodeBody = `
## Starting a server

\`passenger\` is the most basic command, and is often used during development. If you have read [Getting started](../../start/${this.props.currentLanguage}.html) then you have already encountered this command. Throughout this basics tutorial, we will encounter this command often.

You begin using Passenger Standalone by starting a Passenger Standalone server. This can be done with the \`passenger start\` command.

<pre class="highlight">
<span class="prompt">$ </span>passenger start
<span class="output">======= Phusion Passenger Standalone web server started =======
PID file: /Users/phusion/myapp/tmp/pids/passenger.3000.pid.   <span class="label label-info">1</span>
Log file: /Users/phusion/myapp/log/passenger.3000.log.        <span class="label label-info">2</span>
Environment: development                     <span class="label label-info">3</span>
Accessible via: http://0.0.0.0:3000/         <span class="label label-info">4</span>

You can stop Phusion Passenger Standalone by pressing Ctrl-C.
===============================================================
</span></pre>

During startup, Passenger prints its runtime parameters to the console. There are several things you see here:

 1. Passenger has created a PID file. The PID file contains the process ID of the Passenger instance, and allows other \`passenger\` subcommands to know which process to operate on.
 2. Passenger has created a log file. We will talk about logging later.
 3. Passenger has started your app under the \`development\` environment. This means that it has set the environment variable \`NODE_ENV\` to the value \`development\`.

Various Node.js web frameworks -- for example Connect.js and Sails.js -- use the value of one of this environment variable to adjust their behavior.

If you go to http://0.0.0.0:3000/, you will see your application:

<pre class="highlight"><span class="prompt">$ </span>curl http://0.0.0.0:3000/
<span class="output">...your app's front page HTML...</span></pre>

All of these parameters can be customized. We will talk about customization later.

## Logs

Passenger itself logs things. The application itself may also log things. Here we will describe how logs are handled.

You have learned that Passenger Standalone has a log file. Your application probably logs things to a log file.
For example, Rails apps log to \`log/development.log\` when run in development mode.
These are two distinct log files: the Passenger log file is not the application log file.

Your application may also print to stdout or stderr. Passenger also considers these messages as logs.

Passenger handles all of these logs as follows:

 * Passenger's own logs are printed to the Passenger log file.
 * Anything the application logs to its log file, will end up there only, not in the Passenger log file.
 * Anything the application prints to stdout and stderr, are printed to the Passenger log file.
 * Passenger's own logs, the application log file, and anything the application prints to stdout and stderr, are printed to the terminal.

   There is just one caveat here. Passenger can only print the application log file to the terminal, if the log file is named \`log/<ENVIRONMENT NAME>.log\`. This is true for most Rails apps, at least.

## Stopping the server

If you stop Passenger, Passenger will stop your app.

There are two ways to stop the server. The first is by pressing Ctrl-C in the terminal. The second way is by running \`passenger stop\`.

### Ctrl-C

Let us try out the Ctrl-C method. Go to the terminal where the Passenger server was started, and press Ctrl-C there. You should see that it stops.

<pre class="highlight"><span class="c"># This is what you typed before:
$ bundle exec passenger start
...</span>

<span class="c"># Now press Ctrl-C:</span>
<span class="output">^C
Stopping web server... done!</span></pre>

### 'passenger stop'

Let us also try out the \`passenger stop\` command. First, start Passenger up again:

<pre class="highlight"><span class="prompt">$ </span>passenger start</pre>

Open a seperate terminal, change the working directory to your application, and run \`passenger stop\`.

<pre class="highlight"><span class="prompt">$ </span>cd /path-to-your-app
<span class="prompt">$ </span>passenger stop</pre>

When you switch back to the first terminal, you should see that Passenger has indeed stopped.

## Configuration

### Command line options

Most configuration is done by customizing the options passed to the \`passenger\` command. For example, you can customize the port that Passenger listens on using \`--port\`, and you can customize the location of the log file using \`--log-file\`.

Here is an example invocation:

<pre class="highlight"><span class="prompt">$ </span>passenger start --port 4000 --log-file awesome.log
<span class="output">======= Phusion Passenger Standalone web server started =======
PID file: /PID file: /Users/phusion/myapp/tmp/pids/passenger.4000.pid
Log file: /Log file: /Users/phusion/myapp/awesome.log
Environment: development
Accessible via: http://0.0.0.0:4000/

You can stop Phusion Passenger Standalone by pressing Ctrl-C.
===============================================================</span></pre>

Many more configuration options are available. You can see all available options by passing \`--help\`:

<pre class="highlight"><span class="prompt">$ </span>passenger start --help
<span class="output">Usage: passenger start [DIRECTORY] [OPTIONS]
Starts Phusion Passenger Standalone and serve one or more web applications.

Server options:
    -a, --address HOST               Bind to the given address.
                                     Default: 0.0.0.0
    -p, --port NUMBER                Use the given port number. Default: 3000
...</span></pre>

<!-- TODO: link to command line options reference -->

### Passengerfile.json

Command line options are great for temporarily changing a parameter, but if you want to persist a change, then it is best to store configuration in \`Passengerfile.json\`. Passenger Standalone automatically loads configuration from that file if it exists.

The configuration file format is JSON. You can find more information about the configuration file (such as its precedence compared to environment variables and command line options) in the [Configuration introduction](/config/standalone/intro.html').

Here is an example Passengerfile.json which customizes the port, log file path and environment name:

~~~json
{
    "port": 4000,
    "log_file": "awesome.log",
    "environment": "staging"
}
~~~

All command line options have a configuration file equivalent. Just omit the initial two dashes \`--\`, and replace other dashes \`-\` with underscores \`_\`.
`

		switch (this.props.currentLanguage) {
		default:
		case 'Ruby':
			body = rubyBody;
			break;
		case 'Python':
			body = pythonBody;
			break;
		case 'Node':
			body = nodeBody;
			break;
		}
		
		return (
			<div>
				<Markdown source={header} />
				<CurrentSelection />
				<Markdown source={subTitle} />
				<TableOfContents />
				<Markdown escapeHtml={false} source={body} />
				<NextStep name="Process management" path="/tutorials/process_management/" />
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

export default connect(mapStateToProps)(ThePassengerCommand);
