import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

class GettingStarted extends Component {
	render() {
		// markdown variables

		const header = `
# Getting started`

		const subTitle = `
This 5 minute tutorial teaches you to start your application in a Phusion 
Passenger server, in development mode. Feel what Passenger is and how it works.`

		const body = `
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

		return (
			<div>
				<Markdown source={header} />
				<Markdown source={subTitle} />
				<Markdown escapeHtml={false} source={body} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage
	}
}

export default connect(mapStateToProps)(GettingStarted)
