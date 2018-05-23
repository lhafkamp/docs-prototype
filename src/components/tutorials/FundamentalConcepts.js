import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import queryString from 'query-string';

import NextStep from '../NextStep';

class FundamentalConcepts extends Component {
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
		let standaloneText = '';
		let body = '';

		// markdown variables
		const header = `
# Fundamental concepts`;

		const subTitle = `
We give you a basic understanding of what Passenger is. We also explain 
how Passenger fits in the stack and how it compares to other software that you may use.`

		const rubyBody = `
## Passenger and "rails server"
"The Ruby on Rails framework provides a builtin server tool, 
which you can access with the 'rails server' command. The \`rails server\`
is not an application server by itself, but just a small wrapper that 
launches your application in an application server. This is why people 
do not use "rails server" in production. They use an application server
— such as Passenger — directly.

"rails server" uses [Puma](http://puma.io/) by default as of Rails 5.

If you [add Passenger to your Gemfile](/walkthroughs/start/ruby.html#updating-your-gem-bundle), 
then "rails server" will launch Passenger instead of Puma. You can also choose to launch Passenger directly.

## How Passenger fits in the stack
When you deploy your web app to production, there are all sorts of components involved. 
You may have heard of Unicorn, Puma, Nginx, Apache and Capistrano. Passenger replaces 
some components, while collaborating with other components.

In a typical production stack, one would use Nginx or Apache as the web server, 
Passenger as application server, and Capistrano as release automation tool. 
Passenger integrates with Nginx or Apache and manages the application and its resources.

<div>
	<img src="/img/fundamentals.svg" alt="fit in stack"/>
	<p class="sub-text">Passenger integrates with Nginx/Apache, allows the app to speak HTTP and manages the app's processes and resources. Capistrano automates releases.</p>
</div>

### Nginx and Apache

Nginx and Apache are web servers. They provide HTTP transaction handling and serve static 
files. However, they are not Ruby application servers and cannot run Ruby applications directly. 
That is why Nginx and Apache are used in combination with an application server, such as Passenger.

Application servers make it possible for Ruby apps to speak HTTP. Ruby apps (and frameworks like Rails) 
can't do that by themselves. On the other hand, application servers typically aren't as good as 
Nginx and Apache at handling HTTP requests. The devil is in the details: Nginx and Apache are 
better at handling I/O security, HTTP concurrency management, connection timeouts, etc. That's 
why, in production environments, application servers are used in combination with Nginx or Apache.

### Capistrano

Capistrano is an application release automation tool. When releasing a new version of your web 
application, there are actions that need to be performed, such as uploading your application 
code to your servers, running a command to install your gem bundle, restarting processes, etc. 
Capistrano allows you to automate these actions.

Capistrano is not a server that provides HTTP transaction handling, so it does not replace 
application servers or web servers. Instead, you are supposed to use Capistrano in combination 
with them. For example, Capistrano scripts typically contain instructions to restart the 
application server after a new application version has been released.

### Unicorn and Puma

Unicorn and Puma are alternative application servers. Passenger replaces Unicorn and Puma.

Passenger's feature set is very different from those of Unicorn and Puma. In particular, 
Passenger has a stronger focus on ease of use, integration with other components, automatic 
management and enabling problem diagnosis. For example, Passenger can integrate with Nginx 
and Apache in order to reduce setup work, and provides tools for easy problem diagnosis.

## Multiple integration modes

As you've read earlier, Passenger collaborates with other components. This is why Passenger 
supports multiple [integration modes](/indepth/integration_modes.html). Each 
integration mode is designed for easy collaboration with a different component.

Throughout the rest of this basics tutorial, we will cover the Standalone mode only. The Nginx 
and Apache integration modes are covered in the 
[deployment tutorial](walkthroughs/deploy/${this.props.currentLanguage}/index.html).

<div>
	<img src="/img/multiple_placeholder.svg" alt="multiple integrations"/>
	<p class="sub-text">Passenger's supported integration modes. In the Standalone modes, Passenger uses a builtin web server. In the Nginx/Apache integration modes, Passenger integrates with Nginx or Apache.</p>
</div>

The supported integration modes are:

 * **Standalone mode**  
   The Standalone mode is what you've experienced in the [Getting started](/tutorial/getting_started) tutorial. You start Passenger through the \`passenger start\` command.
   ${standaloneText}

   In this mode, Passenger doesn't automatically collaborate with other components, hence the name. Because of this, you do not need to setup any other components besides Passenger, which makes the Standalone mode the easiest mode to get started with. We recommend this mode for use during development. That said, this mode is also fit for production.

   In the Nginx and Apache integration mode, Passenger takes care of glueing Nginx/Apache together with Passenger. In the Standalone mode, you are expected to do that yourself, e.g. using reverse proxies, init scripts, etc.

 * **Nginx integration mode**  
   The Nginx integration mode provides easy integration with Nginx. Passenger operates as an Nginx module. You operate Passenger mostly through Nginx and through Nginx configuration files. So instead of worrying about Passenger and Nginx seperately, you treat the both of them as a whole.

   This mode is mainly meant for production use, not for development use.

 * **Apache integration mode**  
   The Apache integration mode provides easy integration with Apache. Passenger operates as an Apache module. You operate Passenger mostly through Apache and through Apache configuration files. So instead of worrying about Passenger and Apache seperately, you treat the both of them as a whole.

   This mode is mainly meant for production use, not for development use.

### Differences

All modes provide roughly the same feature sets. The main differences lie in...

 * ...performance. Standalone and Nginx are slightly faster than Apache.
 * ...usability. Standalone is easier during development, but Nginx and Apache are easier during production.
 * ...multitenancy. The Nginx and Apache integration modes can host multiple apps at the same time.
 * ...flexibility and control. If your production cluster has an advanced architecture, or if you need deep control over every aspect of the system, then Standalone is the best choice during production.

Please refer to [the in-depth section](/indepth/integration_modes.html) if you wish to learn more about integration modes.

## What Passenger does not do

Passenger does many things, but some things are currently out of scope.

 * **Setting up a server with an operating system**  
   Passenger assumes that you already have a server with a working operating system on it. Passenger is not a hosting service. It is software that is to be installed on a server.  
   However, the Passenger Library contains excellent [documentation on setting up a server](/walkthroughs/deploy/ruby/index.html).
 * **Installing Ruby**  
   To run Ruby apps on Passenger, you must already have Ruby installed. Passenger does not do that for you. Passenger does not care how you install Ruby though; you sometimes just need to tell Passenger where Ruby is.  
   Having said that, the Passenger Library contains excellent [documentation on installing Ruby during a production deployment](/walkthroughs/deploy/ruby/index.html).
 * **Transferring the application code and files to the server**  
   Passenger does not transfer the application code and files to the server for you. To do this, you should use something like Capistrano. Passenger assumes that the application code and files are already on the server, and does not care which tool you use to make that so.  
   The Passenger Library contains documentation on [automating releases using shell scripts](/deploy/automating_app_updates/index.html).
 * **Installing application dependencies**  
   Passenger does not install your application's dependencies for you. That job belongs to Capistrano and Bundler.
 * **Managing the database**  
   If your application requires a database, then Passenger does not install that database for you, nor does it sets up database accounts and tables for you. They must already be set up by the time you deploy your application to Passenger.
`

		const pythonBody = `
## How Passenger fits in the stack

When you deploy your web app to production, there are all sorts of components involved. You may have heard of GUnicorn, uWSGI, Nginx and Apache. Passenger replaces some components, while collaborating with other components.

In a typical production stack, one would use Nginx or Apache as the web server, Passenger as application server, and Fabric as release automation tool. Passenger integrates with Nginx or Apache and manages the application and its resources.

<div>
	<img src="/img/fundamentals.svg" alt="fit in stack"/>
	<p class="sub-text">Passenger integrates with Nginx/Apache, allows the app to speak HTTP and manages the app's processes and resources. Capistrano automates releases.</p>
</div>

### Nginx and Apache

Nginx and Apache are web servers. They provide HTTP transaction handling and serve static files. However, they are not Python application servers and cannot run Python applications directly. That is why Nginx and Apache are used in combination with an application server, such as Passenger.

Application servers provide HTTP request handling services to Python web apps. That said, application servers typically aren't as good as Nginx and Apache at handling HTTP requests. The devil is in the details: Nginx and Apache are better at handling I/O security, HTTP concurrency management, connection timeouts, etc. That's why, in production environments, application servers are used in combination with Nginx or Apache.

### Fabric

Fabric is an application release automation tool. When releasing a new version of your web application, there are actions that need to be performed, such as uploading your application code to your servers, running a command to install your gem bundle, restarting processes, etc. Fabric allows you to automate these actions.

Fabric is not a server that provides HTTP transaction handling, so it does not replace application servers or web servers. Instead, you are supposed to use Fabric in combination with them. For example, Fabric scripts typically contain instructions to restart the application server after a new application version has been released.

### GUnicorn and uWSGI

GUnicorn and uWSGI are alternative application servers. Passenger replaces GUnicorn and uWSGI.

Passenger's feature set is very different from those of GUnicorn and uWSGI. In particular, Passenger has a stronger focus on ease of use, integration with other components, automatic management and enabling problem diagnosis. For example, Passenger can integrate with Nginx and Apache in order to reduce setup work, and provides tools for easy problem diagnosis.

## Multiple integration modes

As you've read earlier, Passenger collaborates with other components. This is why Passenger 
supports multiple [integration modes](/indepth/integration_modes.html). Each 
integration mode is designed for easy collaboration with a different component.

Throughout the rest of this basics tutorial, we will cover the Standalone mode only. The Nginx 
and Apache integration modes are covered in the 
[deployment tutorial](walkthroughs/deploy/${this.props.currentLanguage}/index.html).

<div>
	<img src="/img/multiple_placeholder.svg" alt="multiple integrations"/>
	<p class="sub-text">Passenger's supported integration modes. In the Standalone modes, Passenger uses a builtin web server. In the Nginx/Apache integration modes, Passenger integrates with Nginx or Apache.</p>
</div>

## What Passenger does not do

Passenger does many things, but some things are currently out of scope.

 * **Setting up a server with an operating system**<br>
   Passenger assumes that you already have a server with a working operating system on it. Passenger is not a hosting service. It is software that is to be installed on a server.<br>
   However, the Passenger Library contains excellent [documentation on setting up a server](<%= url_for "/walkthroughs/deploy/python/index.html" %>).
 * **Installing Python**<br>
   To run Python web apps on Passenger, you must already have Python installed. Passenger does not do that for you. Passenger does not care how you install Python though; you sometimes just need to tell Passenger where Python is.<br>
   Having said that, the Passenger Library contains excellent [documentation on installing Python during a production deployment](<%= url_for "/walkthroughs/deploy/python/index.html" %>).
 * **Transferring the application code and files to the server**<br>
   Passenger does not transfer the application code and files to the server for you. To do this, you must use tools like Git, scp, FTP, Capistrano, Fabric, etc. Passenger assumes that the application code and files are already on the server, and does not care which tool you use to make that so.<br>
   The Passenger Library contains documentation on [automating releases using shell scripts](<%= url_for "/deploy/automating_app_updates/index.html" %>).
 * **Installing application dependencies**<br>
   Passenger does not install your application's dependencies for you. That job belongs to Virtualenv and pip.
 * **Managing the database**<br>
   If your application requires a database, then Passenger does not install that database for you, nor does it sets up database accounts and tables for you. They must already be set up by the time you deploy your application to Passenger.

`

		switch (this.props.currentLanguage) {
		default:
		case 'Ruby':
			body = rubyBody;
			standaloneText = `In this mode, Passenger behaves somewhat like "rails server".`;
			break;
		case 'Python':
			body = pythonBody;
			break;
		}

		return (
			<div>
				<Markdown source={header} />
				<Markdown source={subTitle} />
				<Markdown source={body} escapeHtml={false} />
				<NextStep name="Getting started" path="/tutorials/getting_started" />
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
		currentIntegration: state.currentIntegration
	}
}

export default connect(mapStateToProps)(FundamentalConcepts)
