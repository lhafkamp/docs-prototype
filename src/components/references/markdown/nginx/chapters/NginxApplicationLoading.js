import React, { Component } from 'react';
import Markdown from 'react-markdown';

class NginxApplicationLoading extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
<h2 id="application-loading">Application loading</h2>

### passenger_root

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_root <em>path</em>;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>2.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http</td>
  </tr>
</table>

Refers to the location to the Passenger root directory, or to a location configuration file. This configuration option is essential to Passenger, and allows Passenger to locate its own data files.

You normally do not need to set this configuration option. If you used our [Debian](<%= url_for "/install/nginx/apt_repo/index.html" %>) or [RPM](<%= url_for "/install/nginx/yum_repo/index.html" %>) packages to [install Passenger](<%= url_for "/install/nginx/install/index.html" %>), then they automatically configure \`passenger_root\` for you with the right value. If you installed Passenger from Homebrew, tarball or RubyGems, then at some point during the installation process you are told what the correct value should be, and instructed to insert it into your Nginx configuration file.

#### What happens if this option is not set, or set wrongly

If you do not set \`passenger_root\`, Passenger will disable itself, and Nginx will behave as if Passenger was never installed.

If you set \`passenger_root\` to the wrong value, then Passenger will attempt to locate some of its own files, fail to do so, then complain with an error message and abort Nginx.

#### How to fix passenger_root

If you lost the \`passenger_root\` configuration value (e.g. because you accidentally removed the Nginx configuration file, and you are trying to reconstruct it), if you didn't follow the installation instructions correctly, or if you [moved Passenger to a different directory](<%= url_for "/install/nginx/moving.html" %>), then you can fix \`passenger_root\` as follows:

 * If you installed Passenger through source tarball or by cloning it from the Passenger Github repository, then the value should be the path to the Passenger directory.
 * In all other cases, obtain the correct value by running the following command:

       passenger-config --root

Once you have obtained the value, open your Nginx configuration file and insert a \`passenger_root\` option somewhere with that value.


### passenger_enabled

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_enabled <em>on|off</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>passenger_enabled off;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>2.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>server, location, if</td>
  </tr>
</table>

This option enables or disables Passenger for that particular context. Passenger is disabled by default, so you must explicitly enable it for contexts where you want Passenger to serve your application. Please see [the deployment guide](<%= url_for "/deploy/nginx/index.html" %>) for full examples.

~~~nginx
server {
    listen 80;
    server_name www.example.com;
    root /webapps/example/public;

    # You must explicitly set 'passenger_enabled on', otherwise
    # Passenger won't serve this app.
    passenger_enabled on;
}
~~~

Note that since version 5.0.0, \`passenger_enabled\` is inherited into subcontexts. This was not the case in previous versions.

### passenger_start_timeout

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_start_timeout <em>seconds</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>passenger_start_timeout 90;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>4.0.15</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

Specifies a timeout for the startup of application processes. If an application process fails to start within the timeout period then it will be forcefully killed with SIGKILL, and the error will be logged.

### passenger_ruby

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_ruby <em>path-to-ruby-interpreter</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>passenger_ruby ruby;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>4.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

The \`passenger_ruby\` option specifies the Ruby interpreter to use for serving Ruby web applications.

In addition, the \`passenger_ruby\` option in the \`http\` context also specifies which Ruby interpreter to use for Passenger's internal Ruby helper tools, e.g. the one used by [passenger_pre_start](#passenger_pre_start). See [Lightweight Ruby dependency](<%= url_for "/indepth/lightweight_ruby_dependency.html" %>) for more information about the internal Ruby helper tools.

If \`passenger_ruby\` is not specified, then it defaults to \`ruby\`, which means that the first \`ruby\` command found in [PATH]("/indepth/environment_variables.html"#the-path-environment-variable) will be used.

Closely related to \`passenger_ruby\` is [passenger_python](#passenger_python), [passenger_nodejs](#passenger_nodejs), etc. The following example illustrates how it works and how you can use these options to specify different interpreters for different web apps.

~~~nginx
http {
    passenger_root ...;

    # Use Ruby 2.1 by default.
    passenger_ruby /usr/bin/ruby2.1;
    # Use Python 2.6 by default.
    passenger_python /usr/bin/python2.6;
    # Use /usr/bin/node by default.
    passenger_nodejs /usr/bin/node;

    server {
        # This Rails web app will use Ruby 2.1
        listen 80;
        server_name www.foo.com;
        root /webapps/foo/public;
    }

    server {
        # This Rails web app will use Ruby 2.2.1, as installed by RVM
        passenger_ruby /usr/local/rvm/wrappers/ruby-2.2.1/ruby;

        listen 80;
        server_name www.bar.com;
        root /webapps/bar/public;

        # If you have a web app deployed in a sub-URI, customize
        # passenger_ruby/passenger_python inside a \`location\` block.
        # The web app under www.bar.com/blog will use JRuby 1.7.1
        location ~ ^/blog(/.*|$) {
            alias /websites/blog/public$1;
            passenger_base_uri /blog;
            passenger_app_root /websites/blog;
            passenger_document_root /websites/blog/public;
            passenger_enabled on;
            passenger_ruby /usr/local/rvm/wrappers/jruby-1.7.1/ruby;
        }
    }

    server {
        # This Flask web app will use Python 3.0
        passenger_python /usr/bin/python3.0;

        listen 80;
        server_name www.baz.com;
        root /webapps/baz/public;
    }
}

~~~

#### Notes about multiple Ruby interpreters

If your system has multiple Ruby interpreters, then it is important that you set this configuration option to the right value. If you do not set this configuration option correctly, and your app is run under the wrong Ruby interpreter, then all sorts of things may go wrong, such as:

 * The app won't be able to find its installed gems.
 * The app won't be able to run because of syntax and feature differences between Ruby versions.

Note that a different RVM gemset also counts as "a different Ruby interpreter".

<h4 id="setting_correct_passenger_ruby_value">How to set the correct value</h4>

If you are not sure what value to set \`passenger_ruby\` to, then you can find out the correct value as follows.

First, find out the location to the \`passenger-config\` tool and take note of it:

<div>
  <pre class="highlight"><span class="prompt">$ </span>which passenger-config
<span class="output">/opt/passenger/bin/passenger-config</span></pre>
</div>

Next, activate the Ruby interpreter (and if applicable, the gemset) you want to use. For example, if you are on RVM and you use Ruby 2.2.1, you may want to run this:

<div>
  <pre class="highlight"><span class="prompt">$ </span>rvm use 2.2.1</pre>
</div>

Finally, invoke \`passenger-config\` with its full path, passing \`--ruby-command\` as parameter:

<div>
  <pre class="highlight"><span class="prompt">$ </span>/opt/passenger/bin/passenger-config --ruby-command
<span class="output">passenger-config was invoked through the following Ruby interpreter:
  Command: /usr/local/rvm/wrappers/ruby-1.8.7-p358/ruby
  Version: ruby 1.8.7 (2012-02-08 patchlevel 358) [universal-darwin12.0]
  To use in Apache: PassengerRuby /usr/local/rvm/wrappers/ruby-1.8.7-p358/ruby
  To use in Nginx : passenger_ruby /usr/local/rvm/wrappers/ruby-1.8.7-p358/ruby
  To use with Standalone: /usr/local/rvm/wrappers/ruby-1.8.7-p358/ruby /opt/passenger/bin/passenger start
<br />## Notes for RVM users
Do you want to know which command to use for a different Ruby interpreter? 'rvm use' that Ruby interpreter, then re-run 'passenger-config --ruby-command'.</span></pre>
</div>

The output tells you what value to set.

### passenger_python

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_python <em>path-to-python-interpreter</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>passenger_python python;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>4.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

This option specifies the Python interpreter to use for serving Python web applications. If it is not specified, then it uses the first \`python\` command found in [PATH]("/indepth/environment_variables.html#the-path-environment-variable).

Closely related to this option is [passenger_ruby](#passenger_ruby), [passenger_nodejs](#passenger_nodejs), etc. The following example illustrates how it works and how you can use these options to specify different interpreters for different web apps.

~~~nginx
http {
    passenger_root ...;

    # Use Ruby 2.1 by default.
    passenger_ruby /usr/bin/ruby2.1;
    # Use Python 2.6 by default.
    passenger_python /usr/bin/python2.6;
    # Use /usr/bin/node by default.
    passenger_nodejs /usr/bin/node;

    server {
        # This Rails web app will use Ruby 2.1
        listen 80;
        server_name www.foo.com;
        root /webapps/foo/public;
    }

    server {
        # This Rails web app will use Ruby 2.2.1, as installed by RVM
        passenger_ruby /usr/local/rvm/wrappers/ruby-2.2.1/ruby;

        listen 80;
        server_name www.bar.com;
        root /webapps/bar/public;

        # If you have a web app deployed in a sub-URI, customize
        # passenger_ruby/passenger_python inside a \`location\` block.
        # The web app under www.bar.com/blog will use JRuby 1.7.1
        location ~ ^/blog(/.*|$) {
            alias /websites/blog/public$1;
            passenger_base_uri /blog;
            passenger_app_root /websites/blog;
            passenger_document_root /websites/blog/public;
            passenger_enabled on;
            passenger_ruby /usr/local/rvm/wrappers/jruby-1.7.1/ruby;
        }
    }

    server {
        # This Flask web app will use Python 3.0
        passenger_python /usr/bin/python3.0;

        listen 80;
        server_name www.baz.com;
        root /webapps/baz/public;
    }
}
~~~

### passenger_nodejs

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_nodejs <em>path-to-node-js</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>passenger_nodejs node;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>4.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

This option specifies the Node.js command to use for serving Node.js web applications. If it is not specified, then it uses the first \`node\` command found in [PATH]("/indepth/environment_variables.html"#the-path-environment-variable).

Closely related to this option is [passenger_ruby](#passenger_ruby), [passenger_python](#passenger_python), etc. The following example illustrates how it works and how you can use these options to specify different interpreters for different web apps.

~~~nginx
http {
    passenger_root ...;

    # Use Ruby 2.1 by default.
    passenger_ruby /usr/bin/ruby2.1;
    # Use Python 2.6 by default.
    passenger_python /usr/bin/python2.6;
    # Use /usr/bin/node by default.
    passenger_nodejs /usr/bin/node;

    server {
        # This Rails web app will use Ruby 2.1
        listen 80;
        server_name www.foo.com;
        root /webapps/foo/public;
    }

    server {
        # This Rails web app will use Ruby 2.2.1, as installed by RVM
        passenger_ruby /usr/local/rvm/wrappers/ruby-2.2.1/ruby;

        listen 80;
        server_name www.bar.com;
        root /webapps/bar/public;

        # If you have a web app deployed in a sub-URI, customize
        # passenger_ruby/passenger_python inside a \`location\` block.
        # The web app under www.bar.com/blog will use JRuby 1.7.1
        location ~ ^/blog(/.*|$) {
            alias /websites/blog/public$1;
            passenger_base_uri /blog;
            passenger_app_root /websites/blog;
            passenger_document_root /websites/blog/public;
            passenger_enabled on;
            passenger_ruby /usr/local/rvm/wrappers/jruby-1.7.1/ruby;
        }
    }

    server {
        # This Flask web app will use Python 3.0
        passenger_python /usr/bin/python3.0;

        listen 80;
        server_name www.baz.com;
        root /webapps/baz/public;
    }
}
~~~

### passenger_meteor_app_settings

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_meteor_app_settings <em>path-to-json-settings-file</em>;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>5.0.7</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

When using a Meteor application in non-bundled mode, use this option to specify a JSON file with settings for the application. The \`meteor run\` command will be run with the \`--settings\` parameter set to this option.

Note that this option is not intended to be used for bundled/packaged Meteor applications. When running bundled/packaged Meteor applications on Passenger, you should set the \`METEOR_SETTINGS\` environment variable using [passenger_env_var](#passenger_env_var).


### passenger_app_env

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_app_env <em>name</em>;</td>
  </tr>
  <tr>
    <th>Aliases</th>
    <td>
      rails_env <em>name</em>;<br>
      rack_env <em>name</em>;
    </td>
  </tr>
  <tr>
    <th>Default</th>
    <td>passenger_app_env production;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>4.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

This option sets, for the current application, the value of the following environment variables:

 * \`RAILS_ENV\`
 * \`RACK_ENV\`
 * \`WSGI_ENV\`
 * \`NODE_ENV\`
 * \`PASSENGER_APP_ENV\`

Some web frameworks, for example Rails and Connect.js, adjust their behavior according to the value in one of these environment variables.

Passenger sets the default value to **production**. If you're developing the application (instead of running it in production), then you should set this to \`development\`.

If you want to set other environment variables, please use [passenger_env_var](#passenger_env_var).

Setting this option also adds the application environment name to the default [application group name](#passenger_app_group_name), so that you can run multiple versions of your application with different application environment names.


### rails_env, rack_env

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>
      rails_env <em>name</em>;<br>
      rack_env <em>name</em>;
    </td>
  </tr>
  <tr>
    <th>Default</th>
    <td>
      rails_env production;<br>
      rails_env production;
    </td>
  </tr>
  <tr>
    <th>Since</th>
    <td>2.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

These are aliases for [passenger_app_env](#passenger_app_env).

### passenger_app_root

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_app_root <em>path</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>passenger_app_root <em>parent-directory-of-virtual-host-root</em>;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>4.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

By default, Passenger assumes that the application's root directory is the parent directory of the virtual host's (\`server\` block's) root directory. This option allows one to the application's root independently from the virtual host root, which is useful if your application does not follow the conventions that Passenger assumes.

See also [How Passenger + Nginx autodetects applications](<%= url_for "/indepth/app_autodetection/index.html" %>).

#### Example

~~~nginx
server {
    server_name test.host;
    root /var/rails/zena/sites/example.com/public;
    # normally Passenger would
    # have assumed that the application
    # root is "/var/rails/zena/sites/example.com"
    passenger_app_root /var/rails/zena;
}
~~~


### passenger_app_group_name

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_app_group_name <em>name</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>See description</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>4.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

Sets the name of the application group that the current application should belong to. Its default value is the [application root](#passenger_app_root), plus (if it is explicitly set), the [application environment name](#passenger_app_env).

Passenger stores and caches most application spawning settings -- such as environment variables, process limits, etc -- on a per-app-group-name basis. This means that if you want to start two versions of your application, with each version having different environment variables, then you must assign them under different application group names.

The [request queue](<%= url_for "/indepth/request_queueing.html" %>) is also per-application group, so creating multiple application groups allow you to separate requests into different queues.

#### Example

Consider a situation in which you are running multiple versions of the same app, with each version intended for a different customer. You use the \`CUSTOMER_NAME\` environment variable to tell the app which customer that version should serve.

~~~nginx
# WRONG example! Doesn't work!

server {
    listen 80;
    server_name customer1.foo.com;
    root /webapps/foo/public;
    passenger_enabled on;
    passenger_env_var CUSTOMER_NAME customer1;
}

server {
    listen 80;
    server_name customer2.foo.com;
    root /webapps/foo/public;
    passenger_enabled on;
    passenger_env_var CUSTOMER_NAME customer2;
}
~~~

This example doesn't work, because Passenger thinks that they are the same application. When a user visits customer1.foo.com, Passenger will start a process with \`CUSTOMER_NAME=customer1\`. When another user visits customer2.foo.com, Passenger will route the request to the application process that was started earlier. Because environment variables are only set during application process startup, the second user will be served the website for customer 1.

To make this work, assign unique application group names:

~~~nginx
server {
    listen 80;
    server_name customer1.foo.com;
    root /webapps/foo/public;
    passenger_enabled on;
    passenger_env_var CUSTOMER_NAME customer1;
    passenger_app_group_name foo_customer1;
}

server {
    listen 80;
    server_name customer2.foo.com;
    root /webapps/foo/public;
    passenger_enabled on;
    passenger_env_var CUSTOMER_NAME customer2;
    passenger_app_group_name foo_customer2;
}
~~~

Note that it is not necessary to set \`passenger_app_group_name\` if you want to run two versions of your application under different [application environment names](#passenger_app_env), because the application environment name is included in the default application group name. For example, consider a situation in which you want to run a production and a staging version of your application. The following configuration will work fine:

~~~nginx
server {
    listen 80;
    server_name bar.com;
    root /webapps/bar/public;
    passenger_enabled on;
    # Passenger implicitly sets:
    # passenger_app_group_name /webapps/bar/public;
}

server {
    listen 80;
    server_name staging.com;
    root /webapps/bar/public;
    passenger_enabled on;
    passenger_app_env staging;
    # Passenger implicitly sets:
    # passenger_app_group_name '/webapps/bar/public (staging)';
}
~~~


### passenger_app_type

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_app_type <em>name</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><a href="<%= url_for "/indepth/app_autodetection/index.html" %>">Autodetected</a></td>
  </tr>
  <tr>
    <th>Since</th>
    <td>4.0.25</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

By default, Passenger [autodetects](<%= url_for "/indepth/app_autodetection/index.html" %>) the type of the application, e.g. whether it's a Ruby, Python, Node.js or Meteor app. If it's unable to autodetect the type of the application (e.g. because you've specified a custom [passenger_startup_file](#passenger_startup_file)) then you can use this option to force Passenger to recognize the application as a specific type.

Allowed values are:

<table class="table-value">
	<tr>
	  <th>Value</th>
		<td>Application type</td>
	</tr>
	<tr>
	  <th>rack</th>
	  <td>Ruby, Ruby on Rails</td>
	</tr>
	<tr>
	  <th>wsgi</th>
	  <td>Python</td>
	</tr>
	<tr>
	  <th>node</th>
	  <td>Node.js or Meteor JS in bundled/packaged mode</td>
	</tr>
	<tr>  
	  <th>meteor</th>
	  <td>Meteor JS in non-bundled/packaged mode</td>
	</tr>
</table>

#### Example

~~~nginx
server {
    server_name example.com;
    root /webapps/example.com/public;
    passenger_enabled on;
    # Use server.js as the startup file (entry point file) for
    # your Node.js application, instead of the default app.js
    passenger_startup_file server.js;
    passenger_app_type node;
}
~~~

### passenger_startup_file

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_startup_file <em>relative-path</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><a href="<%= url_for "/indepth/app_autodetection/index.html" %>">Autodetected</a></td>
  </tr>
  <tr>
    <th>Since</th>
    <td>4.0.25</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

This option specifies the startup file that Passenger should use when loading the application. This path is relative to the [application root](#passenger_app_root).

Every application has a *startup file* or *entry point file*: a file where the application begins execution. Some languages have widely accepted conventions about how such a file should be called (e.g. Ruby, with its \`config.ru\`). Other languages have somewhat-accepted conventions (e.g. Node.js, with its \`app.js\`). In these cases, Passenger follows these conventions, and executes applications through those files.

Other languages have no conventions at all, and so Passenger invents one (e.g. Python WSGI with \`passenger_wsgi.py\`).

Passenger tries to autodetect according to the following language-specific conventions:

<table class="table-value">
	<tr>
	  <th>Language</th>
		<td>Passenger convention</td>
	</tr>
	<tr>
	  <th>Ruby, Ruby on Rails</th>
	  <td>config.ru</td>
	</tr>
	<tr>
	  <th>Python</th>
	  <td>passenger_wsgi.py</td>
	</tr>
	<tr>
	  <th>Node.js</th>
	  <td>app.js</td>
	</tr>
	<tr>  
	  <th>Meteor JS in non-bundled/packaged mode</th>
	  <td>.meteor</td>
	</tr>
</table>

For other cases you will need to specify the \`startup-file\` manually. For example, on Node.js, you might need to use \`bin/www\` as the startup file instead if you are using the Express app generator.

#### Notes

 * Customizing the startup file affects [user account sandboxing]("/deploy/nginx/user_sandboxing.html"). After all, if user account sandboxing is enabled, the application is executed as the user that owns the startup file.
 * If you set this option, you **must** also set [passenger_app_type](#passenger_app_type), otherwise Passenger doesn't know what kind of application it is.

#### Example

~~~nginx
server {
    server_name example.com;
    root /webapps/example.com/public;
    passenger_enabled on;
    # Use server.js as the startup file (entry point file) for
    # your Node.js application, instead of the default app.js
    passenger_startup_file server.js;
    passenger_app_type node;
}
~~~


### passenger_restart_dir

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_restart_dir <em>relative-path</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>passenger_restart_dir tmp;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>4.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

As described in [Restarting applications](<%= url_for "/admin/#{integration_mode_type}/restart_app.html" %>), Passenger checks the file \`tmp/restart.txt\` in the [application root directory](#passenger_app_root) to determine whether it should restart the application. Sometimes it may be desirable for Passenger to look in a different directory instead, for example for security reasons (see below). This option allows you to customize the directory in which \`restart.txt\` is searched for.

You can either set it to an absolute directory, or to a directory relative to the application root.

#### Examples

~~~nginx
server {
    listen 80;
    server_name www.foo.com;
    # Passenger will check for /apps/foo/public/tmp/restart.txt
    root /apps/foo/public;
    passenger_enabled on;
}

server {
    listen 80;
    server_name www.bar.com;
    root /apps/bar/public;
    # An absolute filename is given; Passenger will
    # check for /restart_files/bar/restart.txt
    passenger_restart_dir /restart_files/bar;
}

server {
    listen 80;
    server_name www.baz.com;
    root /apps/baz/public;
    # A relative filename is given; Passenger will
    # check for /apps/baz/restart_files/restart.txt
    #
    # Note that this directory is relative to the APPLICATION ROOT, *not*
    # the value of DocumentRoot!
    passenger_restart_dir restart_files;
}
~~~

#### Security reasons for wanting to customize PassengerRestartDir

Touching restart.txt will [cause Passenger to restart the application](<%= url_for "/admin/#{integration_mode_type}/restart_app.html" %>). So anybody who can touch restart.txt can effectively cause a Denial-of-Service attack by touching restart.txt over and over. If your web server or one of your web applications has the permission to touch restart.txt, and one of them has a security flaw which allows an attacker to touch restart.txt, then that will allow the attacker to cause a Denial-of-Service.

You can prevent this from happening by pointing \`passenger_restart_dir\` to a directory that's readable by Nginx, but only writable by administrators.


### passenger_spawn_method

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_spawn_method <em>smart|direct</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>
      For Ruby apps: passenger_spawn_method smart;<br>
      For other apps: passenger_spawn_method direct;
    </td>
  </tr>
  <tr>
    <th>Since</th>
    <td>2.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

This option controls whether Passenger spawns applications directly, or using a prefork copy-on-write mechanism. The [spawn methods guide](<%= url_for "/indepth/spawn_methods/index.html" %>) explains this in detail.


### passenger_env_var

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_env_var <em>name</em> <em>value</em>;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>5.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

Sets environment variables to pass to the application. Environment variables are only set during application loading.

#### Example

~~~nginx
server {
    server_name www.foo.com;
    root /webapps/foo/public;
    passenger_enabled on;

    passenger_env_var DATABASE_USERNAME foo_db;
    passenger_env_var DATABASE_PASSWORD secret;
}
~~~


### passenger_load_shell_envvars

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_load_shell_envvars <em>on|off</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>passenger_load_shell_envvars on;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>4.0.20</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
</table>

Enables or disables the loading of shell environment variables before spawning the application.

If this option is turned on, and the user's shell is \`bash\`, then applications are loaded by running them with \`bash -l -c\`. The benefit of this is that you can specify environment variables in .bashrc, and they will appear in the application as one would expect.

If this option is turned off, applications are loaded by running them directly from the \`Passenger core\` process.


### passenger_rolling_restarts

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_rolling_restarts <em>on|off</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>passenger_rolling_restarts off;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>3.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
  <tr>
	  <th>Enterprise only</th>
	  <td><strong>This option is available in <a href="https://www.phusionpassenger.com/enterprise">Passenger Enterprise</a> only. Buy Passenger Enterprise <a href="https://www.phusionpassenger.com/pricing">here</a>.</strong></td>
	</tr>
</table>

Enables or disables support for [zero-downtime application restarts](<%= url_for "/deploy/nginx/zero_downtime_redeployments/index.html" %>) through \`restart.txt\`.

Please note that \`passenger_rolling_restarts\` is completely unrelated to the \`passenger-config restart-app\` command. That command always initiates a blocking restart, unless \`--rolling-restart\` is given.

NOTE: Are you looking to prevent applications from being restarted when you restart Nginx? That is handled by the [Flying Passenger mode](<%= url_for "/deploy/nginx/flying_passenger.html" %>), not by the rolling restarts feature.


### passenger_resist_deployment_errors

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_resist_deployment_errors <em>on|off</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>passenger_resist_deployment_errors off;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>3.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http, server, location, if</td>
  </tr>
	<tr>
	  <th>Enterprise only</th>
	  <td><strong>This option is available in <a href="https://www.phusionpassenger.com/enterprise">Passenger Enterprise</a> only. Buy Passenger Enterprise <a href="https://www.phusionpassenger.com/pricing">here</a>.</strong></td>
	</tr>
</table>

Enables or disables [resistance against deployment errors](<%= url_for "/deploy/nginx/deployment_error_resistance.html" %>).

Suppose that you have upgraded your application and you have issued a command to restart it, but the application update contains an error (e.g. a syntax error or a database configuration error) that prevents Passenger from successfully spawning a process. Passenger would normally display an error message to the visitor in response to this.

By enabling deployment error resistance, Passenger Enterprise would "freeze" the application's process list. Existing application processes (belonging to the previous version) will be kept around to serve requests. The error is [logged](<%= url_for "/admin/#{integration_mode_type}/log_file/index.html" %>), but visitors do not see any error messages. Passenger keeps the old processes around until an administrator has taken action. This way, visitors will suffer minimally from deployment errors.

[Learn more about this feature in Deployment Error Resistance guide](<%= url_for "/deploy/nginx/deployment_error_resistance.html" %>).

Note that enabling deployment error resistance only works if you perform a [rolling restart instead of a blocking restart]("/admin/nginx/restart_app.html"#blocking-restart-vs-zero-down-time-restart-(rolling-restart)).

### passenger_instance_registry_dir

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_instance_registry_dir <em>path</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>passenger_instance_registry_dir /tmp|/var/run/passenger-instreg;</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>5.0.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http</td>
  </tr>
</table>

Specifies the directory that Passenger should use for registering its current instance.

When Passenger starts up, it creates a temporary directory inside the _instance registry directory_. This temporary directory is called the _instance directory_. It contains all sorts of files that are important to that specific running Passenger instance, such as Unix domain socket files so that all the different Passenger processes can communicate with each other. Command line tools such as \`passenger-status\` use the files in this directory in order to query Passenger's status.

It is therefore important that, while Passenger is working, the instance directory is never removed or tampered with. However, the default path for the instance registry directory is the system's temporary directory, and some systems may run background jobs that periodically clean this directory. If this happens, and the files inside the instance directory are removed, then it will cause Passenger to malfunction: Passenger won't be able to communicate with its own processes, and you will see all kinds of connection errors in the log files. This malfunction can only be recovered from by restarting Nginx. You can prevent such cleaning background jobs from interfering by setting this option to a different directory.

This option is also useful if the partition that the temporary directory lives on doesn't have enough disk space.

The instance directory is automatically removed when Nginx shuts down.

<div class="note">
  <h3 class="notoc">Flying Passenger note</h3>
  <p>
    This option has no effect when you are using <a href="/deploy/#{integration_mode_type}/flying_passenger.html">Flying Passenger</a>. Instead, you should configure this by passing the <code>--instance-registry-dir</code> command line option to the Flying Passenger daemon.
  </p>
</div>

#### Default value

The default value for this option is as follows:

 * If you are on Red Hat and CentOS, and installed Passenger through [the RPMs provided by Phusion](<%= url_for "/install/nginx/yum_repo/index.html" %>), then the default value is \`/var/run/passenger-instreg\`.
 * Otherwise, the default value is the value of the \`$TMPDIR\` environment variable. Or, if \`$TMPDIR\` is not set, \`/tmp\`.

#### Note regarding command line tools

Some Passenger command line administration tools, such as \`passenger-status\`, must know what Passenger's instance registry directory is in order to function properly. You can pass the directory through the \`PASSENGER_INSTANCE_REGISTRY_DIR\` or the \`TMPDIR\` environment variable.

For example, if you set 'PassengerInstanceRegistryDir' to '/my_temp_dir', then invoke \`passenger-status\` after you've set the \`PASSENGER_INSTANCE_REGISTRY_DIR\`, like this:

~~~bash
export PASSENGER_INSTANCE_REGISTRY_DIR=/my_temp-dir
sudo -E passenger-status
~~~

Notes regarding the above example:

 * The -E option tells 'sudo' to preserve environment variables.
 * If Passenger is installed through an RVM Ruby, then you must use \`rvmsudo\` instead of \`sudo\`.

### passenger_fly_with

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_fly_with <em>path</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>Flying Passenger mode disabled</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>4.1.0</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http</td>
  </tr>
	<tr>
	  <th>Enterprise only</th>
	  <td><strong>This option is available in <a href="https://www.phusionpassenger.com/enterprise">Passenger Enterprise</a> only. Buy Passenger Enterprise <a href="https://www.phusionpassenger.com/pricing">here</a>.</strong></td>
	</tr>
</table>

Enables the [Flying Passenger](<%= url_for "/deploy/#{integration_mode_type}/flying_passenger.html" %>) mode, and configures Nginx to connect to the Flying Passenger daemon that's listening on the given socket filename.
`
			} />
		)
	}
}

export default NginxApplicationLoading;
