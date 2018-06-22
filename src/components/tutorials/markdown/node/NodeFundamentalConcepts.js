import React, { Component } from 'react';
import Markdown from 'react-markdown';

class NodeFundamentalConcepts extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
## The "application server" concept

Node.js applications are normally responsible for their services from the ground-up. You literally ran the application, which would for example import support libraries for handling HTTP requests, spawning subprocesses of itself, etc.

<figure><img src="${process.env.PUBLIC_URL}/img/traditional_nodejs.png"></figure>

As an application server, Passenger reverses this relationship. The application server runs the application. Services are provided to the application "for free". [The reverse port binding mechanism](<%= url_for "/indepth/nodejs/reverse_port_binding.html" %>) is an example of this reversed relationship at work.

<figure><img src="${process.env.PUBLIC_URL}/img/app_server_concept.png"></figure>

## How Passenger fits in the stack

When you deploy your web app to production, there are all sorts of components involved. You may have heard of PM2, Forever, Nginx and Cluster. Passenger replaces some components, while collaborating with other components.

In a typical production stack, one would use Nginx as the web server and Passenger as the application server. Passenger integrates with Nginx and manages the application and its resources.

<figure>
  <img src=${process.env.PUBLIC_URL}/img/passenger_node_architecture.png">
  <p class="sub-text">Passenger integrates with Nginx and manages the app's processes and resources.</p>
</figure>

### A holistic approach

If you have deployed a Node.js app to production before, then you may know that it involves glueing a bunch of different tools together:

 * Nginx as a reverse proxy.
 * Forever/PM2 to keep your app running and to manage your app's processes.
 * An init script to start your app at boot.
 * The Cluster module for multi-core usage.

We dislike having so many moving parts, so Passenger takes more of a holistic approach to the problem. As an application server, Passenger is conceptually like Nginx, Forever/PM2, the init script and the cluster module combined in a single, lightweight, easy-to-use package. Instead needing you to glue different tools together, Passenger takes care of the "gluing together" for you.

The holistic approach saves time and effort.

### Nginx

Nginx is a web server. It provides HTTP transaction handling and serves static files. However, it cannot manage Node.js apps by itself.

It is a good idea to put Node.js behind an Nginx reverse proxy, because Nginx is better than Node.js at handling HTTP requests in a secure manner.

However, connecting Node.js with an Nginx reverse proxy involves redundant work riddled with boilerplate code. Passenger takes care of this automatically and saves you time and effort.

### Vs PM2 and Forever

PM2 and Forever are tools for keeping Node.js apps running. If an app crashes, PM2 and Forever can restart the app.

Passenger replaces PM2 and Forever because Passenger provides their functionality. Where PM2 and Forever have to be setup separately, Passenger provides the functionality builtin, saving time and effort.

Passenger also provides features not found in PM2 and Forever, such as adjusting the number of processes dynamically based on traffic, and better load balancing (see "Vs Cluster module" to learn more about this).

### Vs Cluster module

The Node.js Cluster module is a library for running Node.js apps in multiple processes and load balancing traffic between them. Running the app in multiple processes allows better multi-core usage, better performance and better fault-tolerance. The Cluster module requires the developer to write some boilerplate code in order to use it.

Passenger replaces the Cluster module. No boilerplate code is required: Passenger can launch your app in multiple processes and load balance traffic automatically, with no code changes most of the time, aside from the removal of the cluster module boilerplate if you've already added it.

Besides this, the biggest advantage that Passenger provides is that it can load balance WebSockets, Socket.IO
and SockJS through the use of sticky sessions. These technologies do not work well with the Cluster module because the Cluster module's load balancing mechanism is generic (and thus cannot implement sticky sessions), while Passenger's mechanism is specifically written for HTTP.

If you are using Passenger, and we hope you do, then you must not include the Cluster module in your project as it conflicts with Passenger

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

The supported integration modes are:

 * **Standalone mode**  
   The Standalone mode is what you've experienced in the [Getting started](/tutorial/getting_started) tutorial. You start Passenger through the \`passenger start\` command.

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

 * **Setting up a server with an operating system**<br>
   Passenger assumes that you already have a server with a working operating system on it. Passenger is not a hosting service. It is software that is to be installed on a server.<br>
   However, the Passenger Library contains excellent [documentation on setting up a server](<%= url_for "/walkthroughs/deploy/python/index.html" %>).
 * **Installing Node**<br>
   To run Node web apps on Passenger, you must already have Node installed. Passenger does not do that for you. Passenger does not care how you install ${this.props.currentLanguage} though; you sometimes just need to tell Passenger where ${this.props.currentLanguage} is.<br>
   Having said that, the Passenger Library contains excellent [documentation on installing ${this.props.currentLanguage} during a production deployment](<%= url_for "/walkthroughs/deploy/${this.props.currentLanguage}/index.html" %>).
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
