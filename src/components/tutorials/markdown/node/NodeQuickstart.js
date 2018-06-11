import React, { Component } from 'react';
import Markdown from 'react-markdown';

class NodeQuickstart extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
## Install Passenger

<div>
	<select id="os_install_select">
		<option value="osx">macOS</option>
	</select>
	<span class="arrow-down"></span>
</div>

## Preparing the example application

In this tutorial we will use [an example "hello world" application](https://github.com/phusion/passenger-nodejs-connect-demo), utilizing [Connect.js](https://github.com/senchalabs/connect):

<pre class="highlight"><span class="prompt">$ </span>git clone https://github.com/phusion/passenger-nodejs-connect-demo.git
<span class="prompt">$ </span>cd passenger-nodejs-connect-demo
<span class="prompt">$ </span>npm install</pre>

## Running the server

The simplest way to run your app is with the \`node\` command:

<pre class="highlight"><span class="prompt">$ </span>node app.js</pre>

Passenger can be used the same way as the \`node\` command: you run your app with \`passenger start\` and two extra command line options:

<pre class="highlight">
<span class="prompt">$ </span>passenger start --app-type node --startup-file app.js
<span class="output">======= Phusion Passenger Standalone web server started =======
PID file: /Users/phusion/myapp/passenger.3000.pid
Log file: /Users/phusion/myapp/passenger.3000.log
Environment: development
Accessible via: http://0.0.0.0:3000/

You can stop Phusion Passenger Standalone by pressing Ctrl-C.
===============================================================</span></pre>

<div class="note">If you run your app with a higher level command like <code>npm start</code>, you can find out what <code>--startup-file</code> to specify by looking at <code>package.json</code>. It should be whatever is behind the <code>node</code> command.</div>

As you can see in the output, Passenger is now serving your app on [http://0.0.0.0:3000/](http://0.0.0.0:3000/). So if you go to that URL, you will should see your application:

<pre class="highlight"><span class="prompt">$ </span>curl http://0.0.0.0:3000/
<span class="output">...your app's front page HTML...</span></pre>

## Passenger is polyglot

Passenger supports apps in multiple programming languages. That's why you need to specify what language you're using.
The \`--app-type node\` option does just that.

## Reversed port binding

Normally, a Node.js app binds a server socket on a certain port by calling \`listen()\` on an \`http.Server\` object. But when run in Passenger, this control is inversed. The user that invokes the \`passenger\` command specifies what address and port to listen on, and Passenger makes sure your app does so.

Most of the time, reverse port binding just works. But if your app creates multiple http.Server objects, then you will confuse the reserve port binding system, and you'll have to give it some hints.

Reverse port binding will be covered in [Basics part 2: fundamental concepts -> The "application server concept"](../basics//fundamental_concepts.html#the-application-server-concept) and in the [In-depth guide](<%= url_for "/indepth/nodejs/reverse_port_binding.html" %>).

## Logs

Passenger prints its own logs not only to the terminal, but also to a log file. During startup, Passenger tells you what log file it used. This is typically \`passenger.XXXX.log\`.

There may also be *application* logs, generated either by your app or by the framework you're using. These logs are completely separate from Passenger's own logs. If the application logs are printed to stdout or stderr, then Passenger will display them. Otherwise, it is up to you to manually view application log files, e.g. with the Unix \`tail\` tool on the corresponding files.

## Stopping the server

If you stop Passenger, Passenger will stop your app.

There are two ways to stop the server. The first is by pressing Ctrl-C in the terminal.

<pre class="highlight">
<span class="prompt">$ </span>passenger start --app-type node --startup-file app.js
<span class="output">...
(press Ctrl-C here)
Stopping web server... done!</span>
</pre>

The second way is by starting a seperate terminal, changing the working directory to your application, and running \`passenger stop\`:

<pre class="highlight"><span class="prompt">$ </span>cd /path-to-your-app
<span class="prompt">$ </span>passenger stop</pre>
`
			} />
		)
	}
}

export default NodeQuickstart;
