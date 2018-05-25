import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import queryString from 'query-string';

import NextStep from '../NextStep';

class Quickstart extends Component {
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
# Quickstart`

		const subTitle = `
This 5 minute tutorial teaches you to start your application in a Phusion 
Passenger server, in development mode. Feel what Passenger is and how it works.`

		const rubyBody = `
## Preparing the example application

In this tutorial we will use an example "hello world" application. Clone the one you like.

[Ruby on Rails example](https://github.com/phusion/passenger-ruby-rails-demo):

<pre class="highlight"><span class="prompt">$ </span>git clone https://github.com/phusion/passenger-ruby-rails-demo.git
<span class="prompt">$ </span>cd passenger-ruby-rails-demo</pre>

[Sinatra example](https://github.com/phusion/passenger-ruby-sinatra-demo):

<pre class="highlight"><span class="prompt">$ </span>git clone https://github.com/phusion/passenger-ruby-sinatra-demo.git
<span class="prompt">$ </span>cd passenger-ruby-sinatra-demo</pre>

## Updating your gem bundle

Open your app's Gemfile and add "passenger":

~~~ruby
gem "passenger", ">= 5.0.25", require: "phusion_passenger/rack_handler"
~~~

Now open a terminal, go to your application's directory and run bundle install to install your gem bundle:

<pre class="highlight"><span class="prompt">$ </span>cd /path-to-your-app
<span class="prompt">$ </span>bundle install
<span class="output">...
Installing passenger x.x.x
...
Your bundle is complete!</span></pre>

## Running the server

You are now ready to run the Passenger server. Run:

<pre class="highlight"><span class="prompt">$ </span>bundle exec passenger start
<span class="output">======= Phusion Passenger Standalone web server started =======
PID file: /Users/phusion/myapp/tmp/pids/passenger.3000.pid
Log file: /Users/phusion/myapp/log/passenger.3000.log
Environment: development
Accessible via: http://0.0.0.0:3000/

You can stop Phusion Passenger Standalone by pressing Ctrl-C.
===============================================================</span></pre>

As you can see in the output, Passenger is now serving your app on [http://0.0.0.0:3000/](http://0.0.0.0:3000/). So if you go to that URL, you will should see your application:

<pre class="highlight"><span class="prompt">$ </span>curl http://0.0.0.0:3000/
<span class="output">...your app's front page HTML...</span></pre>

<div class="note">
  <h3 id="bundle-exec-rails-server">You can also use "bundle exec rails server"</h3>
  <p>If you use Rails, then you can also run <code>bundle exec rails server</code>. As long as you have the above Gemfile entry, that command will start a Passenger-based server.</p>
</div>

## Logs

Passenger prints its own logs not only to the terminal, but also to a log file. During startup, Passenger tells you what log file it used. This is typically \`log/passenger.XXXX.log\`.

There are also the *application* logs, such as \`log/development.log\` and \`log/production.log\`. These logs are completely separate from Passenger's own logs. If you use Rails, then Passenger will also print your application logs to the terminal, but it will not print them into Passenger's log file.

If you do not use Rails then Passenger may not print your logs to the terminal at all. In that case it is up to you to manually view those log files, e.g. with the Unix \`tail\` tool.

## Stopping the server

There are two ways to stop the server. The first is by pressing Ctrl-C in the terminal.

<pre class="highlight"><span class="prompt">$ </span>bundle exec passenger start
<span class="output">...
(press Ctrl-C here)
Stopping web server... done!</span></pre>

The second way is by starting a seperate terminal, changing the working directory to your application, and running \`bundle exec passenger stop\`:

<pre class="highlight"><span class="prompt">$ </span>cd /path-to-your-app
<span class="prompt">$ </span>bundle exec passenger stop</pre>

## Conclusion

Congratulations! You've passed this tutorial and seen Passenger in action. You can find the end result of this tutorial in the example application's git repository's \`end_result\` branch:

 * [Ruby on Rails example: end result](https://github.com/phusion/passenger-ruby-rails-demo/tree/end_result)
 * [Sinatra example: end result](https://github.com/phusion/passenger-ruby-sinatra-demo/tree/end_result)
`

		const pythonBody = `
## Preparing the example application

In this tutorial we will use [an example "hello world" application](https://github.com/phusion/passenger-python-flask-demo), written in [Flask](http://flask.pocoo.org/):

    git clone https://github.com/phusion/passenger-python-flask-demo.git
    cd passenger-python-flask-demo

## Adding a WSGI file

### What is WSGI?

Many Python web frameworks have a builtin web server that is activated by running the app. For example, you normally run a Flask app with the builtin Flask web server like this:

~~~bash
python app.py
~~~

Passenger doesn't work like that. It works with [the Python WSGI standard](http://wsgi.readthedocs.org/en/latest/). WSGI defines a standard interface for web applications, allowing any web application that implements WSGI to work with any server that supports WSGI. Pretty much any modern Python web framework implements WSGI. This includes Django, Flask and more.

### The Passenger WSGI file

Create a WSGI file in the app's directory. Passenger expects it be called \`passenger_wsgi.py\`. The contents depends on the application and the web framework, but for our Flask example app, this is what you need to put in the file:

~~~python
# passenger_wsgi.py
from app import MyApp as application
~~~

<div class="info">
  <h3 class="notoc">What just happened?</h3>
  <p>WSGI works by defining a callable object called <code>application</code> inside the WSGI file. This callable expects a request object, which the WSGI server provides; and returns a response object, which the WSGI server serializes and sends to the client.</p>
  <p>Flask's application object, created by a <code>MyApp = Flask(__name__)</code> call, is a valid WSGI callable object. So our WSGI file is as simple as importing the Flask application object (<code>MyApp</code>) from <code>app.py</code>, and calling it <code>application</code>.</p>
  <p>Other Python web frameworks require different code, but work with similar principles.</p>
</div>

## Running the server

You can now run your app with \`passenger start\`:

~~~bash
passenger start
# => ======= Phusion Passenger Standalone web server started =======
# => PID file: /Users/phusion/myapp/passenger.3000.pid
# => Log file: /Users/phusion/myapp/passenger.3000.log
# => Environment: development
# => Accessible via: http://0.0.0.0:3000/
# =>
# => You can stop Phusion Passenger Standalone by pressing Ctrl-C.
# => ===============================================================
~~~

As you can see in the output, Passenger is now serving your app on [http://0.0.0.0:3000/](http://0.0.0.0:3000/). So if you go to that URL, you will should see your application:

~~~bash
curl http://0.0.0.0:3000/
# => your app's front page HTML
~~~

## Stopping the server

There are two ways to stop the server. The first is by pressing Ctrl-C in the terminal.

~~~bash
passenger start
# => ...
# => (press Ctrl-C here)
# => Stopping web server... done!
~~~

The second way is by starting a seperate terminal, changing the working directory to your application, and running \`passenger stop\`:

~~~bash
cd /path-to-your-app
passenger stop
~~~

## Conclusion

Congratulations! You've passed this tutorial and seen Passenger in action. You can find the end result of this tutorial in [the example application's git repository's \`end_result\` branch](https://github.com/phusion/passenger-python-flask-demo/tree/end_result).

You may now be interested in intermediate-level tutorial.
`

const nodeBody = `
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
				<Markdown source={subTitle} />
				<Markdown escapeHtml={false} source={body} />
				<NextStep name="Installation" path="/tutorials/installation/" />
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

export default connect(mapStateToProps)(Quickstart)
