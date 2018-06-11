import React, { Component } from 'react';
import Markdown from 'react-markdown';

class RubyInstallation extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
Installing Passenger is easy. During development, you use Bundler to install Passenger.

Open your application's Gemfile and add "passenger":

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

You can verify that it works by querying Passenger's version number:

<pre class="highlight"><span class="prompt">$ </span>bundle exec passenger --version
<span class="output">Phusion Passenger version X.X.X

"Phusion Passenger" is a trademark of Hongli Lai &amp; Ninh Bui.</span></pre>

<div class="note">Installation in production is different, but we'll cover that later in the <a href="../../deploy/ruby/">deployment tutorial</a>.</div>
`
			} />
		)
	}
}

export default RubyInstallation;
