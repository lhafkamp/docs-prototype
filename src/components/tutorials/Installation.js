import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

class Installation extends Component {
	render() {
		// markdown variables

		const header = `
# Installation`

		const subTitle = `
Installing Passenger is easy. During development, you use Bundler to install Passenger.`

		const body = `
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
		currentLanguage: state.currentLanguage,
		currentIntegration: state.currentIntegration
	}
}

export default connect(mapStateToProps)(Installation);
