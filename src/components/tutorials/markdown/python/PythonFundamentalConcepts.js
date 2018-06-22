import React, { Component } from 'react';
import Markdown from 'react-markdown';

class NodeFundamentalConcepts extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
## How Passenger fits in the stack

When you deploy your web app to production, there are all sorts of components involved. You may have heard of GUnicorn, uWSGI, Nginx and Apache. Passenger replaces some components, while collaborating with other components.

In a typical production stack, one would use Nginx or Apache as the web server, Passenger as application server, and Fabric as release automation tool. Passenger integrates with Nginx or Apache and manages the application and its resources.

<div>
	<img src="${process.env.PUBLIC_URL}/img/fundamentals.svg" alt="fit in stack"/>
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
	<img src="${process.env.PUBLIC_URL}/img/multiple_placeholder.svg" alt="multiple integrations"/>
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
			} />
		)
	}
}

export default NodeFundamentalConcepts;
