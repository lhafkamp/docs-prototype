import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import queryString from 'query-string';

import NextStep from '../NextStep';

function RubyHeroku() {
	const body = `
# Deploying your Ruby app on a Heroku production server

### Add "passenger" to your gem bundle

Open your Gemfile. Remove lines that look like one of these:

~~~ruby
gem "unicorn"
gem "thin"
gem "puma"
~~~

Make sure the following line exists:

~~~ruby
gem "passenger"
~~~

When you are done, install your gem bundle with:

<pre class="highlight"><span class="prompt">$ </span>bundle install</pre>

### Updating your Procfile

Open your app's Procfile, or create one if you don't already have one. Remove lines that look like one of these:

    web: bundle exec ruby web.rb -p $PORT
    web: bundle exec unicorn -p $PORT
    web: bundle exec puma -p $PORT
    web: bundle exec thin start -p $PORT

Insert:

    web: bundle exec passenger start -p $PORT --max-pool-size 3

### Pushing the code to Heroku

Commit and deploy to Heroku:

<pre class="highlight"><span class="prompt">$ </span>git commit -a -m "Switch to Passenger"
<span class="prompt">$ </span>git push heroku master</pre>
`
	return (
		<Markdown escapeHtml={false} source={body} />
	)
}

function NodeDigitalOcean() {
	const body = `
# Deploying a Node.js app on a Digital Ocean production server

On this page you will learn how you can deploy your app to a server that is running Passenger.
You can either follow these instructions with your own app, or you can use <a href="https://github.com/phusion/passenger-nodejs-connect-demo">the sample Connect.js app</a> we prepared.

## 1 Transferring the app code to the server

### 1.1 Push your code to a Git repository

<div class="note">
  If you are using our <a href="/walkthroughs/start/#{language_type}.html#preparing-the-example-application">sample app</a>, you can <a href="#<%= id_prefix %>login-to-your-server-create-a-user-for-the-app">skip to the next step</a>.
</div>

<p>
  We want to transfer our application's code to the server. The easiest way to do that is via Git.
</p>

<p>
  If you have already setup a Git repository, push your application's code to that repository by running this on your local computer:
</p>

<pre class="highlight"><span class="prompt">$ </span>git push</pre>

<p>
  If you have not already setup a Git repository, go to <a href="https://github.com/">Github</a>, create a repository and push your application's code there.
</p>

### 1.2 Login to your server, create a user for the app

Login to your server with SSH:
<pre class="highlight"><span class="prompt">$ </span>ssh <span class="o">adminuser</span>@yourserver.com</pre>

Replace \`adminuser\` with the name of an account with administrator privileges or sudo privileges.

<div class="info">Starting from this point, unless stated otherwise, all commands that we instruct you to run should be run on the server, not on your local computer!</div>

Now that you have logged in, you should create an operating system user account for your app. For security reasons, it is a good idea to run each app under its own user account, in order to limit the damage that security vulnerabilities in the app can do. Passenger will automatically run your app under this user account as part of its [user account sandboxing feature](<%= url_for "/deploy/#{integration_mode_type}/user_sandboxing.html" %>).

You should give the user account the same name as your app. But for demonstration purposes, this tutorial names the user account \`myappuser\`.

<pre class="highlight"><span class="prompt">$ </span>sudo adduser <span class="o">myappuser</span></pre>

We also ensure that that user has your SSH key installed:

<pre class="highlight"><span class="prompt">$ </span>sudo mkdir -p ~<span class="o">myappuser</span>/.ssh
<span class="prompt">$ </span>touch $HOME/.ssh/authorized_keys
<span class="prompt">$ </span>sudo sh -c <span class="s">"cat $HOME/.ssh/authorized_keys &gt;&gt; ~<span class="o">myappuser</span>/.ssh/authorized_keys"</span>
<span class="prompt">$ </span>sudo chown -R <span class="o">myappuser:</span> ~<span class="o">myappuser</span>/.ssh
<span class="prompt">$ </span>sudo chmod <span>700</span> ~<span class="o">myappuser</span>/.ssh
<span class="prompt">$ </span>sudo sh -c <span class="s">"chmod <span>600</span> ~<span class="o">myappuser</span>/.ssh/*"</span></pre>

### 1.3 Install Git on the server
<pre class="highlight"><span class="prompt">$ </span>sudo apt-get install -y git</pre>

### 1.4 Pull code
<p>
  You need to pick a location in which to permanently store your application's code. A good location is <code>/var/www/APP_NAME</code>. Let us create that directory.
</p>

<pre class="highlight"><span class="prompt">$ </span>sudo mkdir -p /var/www/<span class="o">myapp</span>
<span class="prompt">$ </span>sudo chown <span class="o">myappuser</span>: /var/www/<span class="o">myapp</span></pre>

<p>
  Replace <code>myapp</code> and <code>myappuser</code> with your app's name and your app user account's name.
</p>

<p>
  Now let us pull the code from Git:
</p>

<pre class="highlight"><span class="prompt">$ </span>cd /var/www/<span class="o">myapp</span>
<span class="prompt">$ </span>sudo -u <span class="o">myappuser</span> -H git clone <span class="o">git://github.com/username/myapp.git</span> code</pre>

<div class="info">
  <p>If you are using our <a href="url_for "/walkthroughs/start/#{language_type}.html#preparing-the-example-application">sample app</a>, use this Git clone command instead:</p>
  <pre class="highlight"><span class="prompt">$ </span>cd /var/www/<span class="o">myapp</span>
<span class="prompt">$ </span>sudo -u <span class="o">myappuser</span> -H git clone --branch=master https://github.com/phusion/passenger-nodejs-connect-demo.git code</pre>
</div>

<p>
  Your app's code now lives on the server at <code>/var/www/myapp/code</code>.
</p>

## 2 Preparing the app's environment

### 2.1 Login as the app's user
All subsequent instructions must be run under the application's user account. While logged into your server, login under the application's user account as follows:

<pre class="highlight"><span class="prompt">$ </span>sudo -u <span class="o">myappuser</span> -H bash -l</pre>


### 2.2 Install app dependencies
Your application has various dependencies. They must be installed. Most of these dependencies are Javascript libraries, managed by npm. You can install them by running \`npm install\` in your app's directory:

<pre class="highlight"><span class="prompt">$ </span>cd /var/www/<span class="o">myapp</span>/code
<span class="prompt">$ </span>npm install --production</pre>

Your app may also depend on services, such as PostgreSQL, Redis, etc. Installing services that your app depends on is outside of this tutorial's scope.

## 3 Configuring Nginx and Passenger

Now that you are done with transferring your app's code to the server and setting up an environment for your app, it is time to configure Nginx so that Passenger knows how to serve your app.

### 3.1 Go back to the admin account
You have previously logged into your app's user account in order to prepare the app's environment. That user does not have sudo access. In the next steps, you need to edit configuration files, for which sudo access is needed. So you need to switch back to the admin account.

This can be done by simply exiting the shell that was logged into the app's user account. You will then be dropped back to the admin account. For example:

<pre class="highlight"><span class="c"># This is what you previously ran:</span>
<span class="output">admin$ sudo -u myappuser -H bash -l
myappuser$ ...</span>

<span class="c"># Type \`exit\` to go back to the account you were before</span>
<span class="prompt">myappuser$ </span>exit
<span class="prompt">admin$</span> _</pre>

### 3.2 Edit Nginx configuration file
<p>
  We need to edit your Nginx configuration file and setup a virtual host entry that points to your app. This virtual host entry tells Nginx (and Passenger) where your app is located.
</p>
<div>
      <pre class="highlight"><span class="prompt">$ </span>sudo nano /etc/nginx/sites-enabled/<span class="o">myapp</span>.conf</pre>
</div>
<p>
  Replace <code>myapp</code> with your app's name.
</p>
<p>
  Put this inside the file:
</p>

<pre class="highlight">server {
  listen 80;
  server_name <span class="o">yourserver.com</span>;

  <span class="c"># Tell Nginx and Passenger where your app's 'public' directory is</span>
  root <span class="o">/var/www/myapp/code</span>/public;

  <span class="c"># Turn on Passenger</span>
  passenger_enabled on;
  <span class="c"># Tell Passenger that your app is a Node.js app</span>
  passenger_app_type node;
  passenger_startup_file <span class="o">app.js</span>;
}</pre>

Replace \`yourserver.com\` with your server's host name, replace \`/var/www/myapp/code\` with your application's code directory path and replace \`app.js\` with your app's entry point file.

When you are done, restart Nginx:

### 3.3 Test drive

You should now be able to access your app through the server's host name! Try running this from your local computer. Replace \`yourserver.com\` with your server's hostname, exactly as it appears in the Nginx config file's \`server_name\` directive.

<pre class="highlight"><span class="prompt">$ </span>curl http://yourserver.com/
<span class="output">...your app's front page HTML...</span></pre>

If you do not see your app's front page HTML, then these are the most likely causes:

1. You did not correctly configure your \`server_name\` directive. The \`server_name\` must exactly match the host name in the URL. For example, if you use the command \`curl http://45.55.91.235/\` to access your app, then the \`server_name\` must be \`45.55.91.235\`.
2. You did not setup DNS records. Setting up DNS is outside the scope of this tutorial. In the mean time, we recommend that you use your server's IP address as the server name.
`
	return (
		<Markdown escapeHtml={false} source={body} />
	)
}

class DeployingYourApp extends Component {
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
		let deployContent;

		switch(this.props.currentProviderChoice) {
			case 'Heroku':
				deployContent = <RubyHeroku />
				break;
			default:
			case 'DigitalOcean':
				deployContent = <NodeDigitalOcean />
				break;
		}

		return (
			<div id="deploy-to-production">
				{deployContent}
				<h3>All done!</h3>
				<p>Congratulations, you have now deployed your app with Passenger!</p>
				<NextStep name="Deploying updates" path="/tutorials/deploy_to_production/deploy_updates/"></NextStep>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
		currentIntegration: state.currentIntegration,
		currentProviderChoice: state.currentProviderChoice
	}
}

export default connect(mapStateToProps)(DeployingYourApp);
