import React, { Component } from 'react';
import Markdown from 'react-markdown';

class RubyDeployUpdates extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
<h2>1 Transferring latest code</h2>

<h3>1.1 Login to the server as the application's user</h3>
<p>Login to your server with SSH:</p>
<pre class="highlight"><span class="prompt">local-computer$ </span>ssh <span class="o">myappuser</span>@yourserver.com</pre>
<p>
  Replace <code>myappuser</code> with name of the application's OS user account.
</p>

<div class="info">Starting from this point, unless stated otherwise, all commands that we instruct you to run should be run on the server, not on your local computer!</div>

<h3>1.2 Pull latest code from Git</h3>

<p>
  Go to your application's code directory on the server, then use Git to pull the latest code:
</p>

<pre class="highlight"><span class="prompt">$ </span>cd /var/www/<span class="o">myapp</span>/code
<span class="prompt">$ </span>git pull</pre>

<h2>2 Prepare application</h2>
<h3>2.1 Switch to the appropriate Ruby interpreter</h3>

<p>
  If you have multiple Ruby interpreters on your system, then you must ensure that your shell has activated the same Ruby interpreter that you used when you first deployed your app.
</p>
<p>
  For example, if you are using RVM to manage Ruby interpreters, run the following (assuming your app is supposed to use Ruby <%= LATEST_RUBY_VERSION %>).
</p>
<pre class="highlight"><span class="prompt">$ </span>rvm use ruby-<%= LATEST_RUBY_VERSION %></pre>

<h3>2.2 Install app dependencies</h3>
<p>
  Your application's gem dependencies may have changed, so we should install any updated gem dependencies. Run:
</p>
<pre class="highlight"><span class="prompt">$ </span>bundle install --deployment --without development test</pre>

<h3>2.3 Compile Rails assets and run database migrations</h3>
<p>
  If your app is a Rails app, then you need to compile the latest Rails assets and run any database migrations. If your app is not a Rails app, please skip to the next step.
</p>
<pre class="highlight"><span class="prompt">$ </span>bundle exec rake assets:precompile db:migrate RAILS_ENV=production</pre>

<h2>3 Restart application</h2>
<p>
  Passenger may still be serving an old instance of your application. Now that all application updates have been prepared, tell Passenger to restart your application so that the updates take effect.
</p>

<pre class="highlight"><span class="prompt">$ </span>bundle exec passenger-config restart-app $(pwd)</pre>
`
			} />
		)
	}
}

export default RubyDeployUpdates;
