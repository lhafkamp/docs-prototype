import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import queryString from 'query-string';

import NextStep from '../NextStep';

class Installation extends Component {
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
# Installation`

		const rubyBody = `
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

		const otherBody = `
Installing Passenger for development is easy. We provide OS-specific installation packages to make your life easy.

<div>
	<select id="os_install_select">
		<option value="osx">macOS</option>
	</select>
	<span class="arrow-down"></span>
</div>

<div class="install_os install_os_osx">
  <p>
    You can install Passenger through <a href="http://brew.sh/">Homebrew</a>:
  </p>
  <pre class="highlight shell"><span class="prompt">$ </span>brew install passenger</pre>
  <p>After installation, please validate the install by running <code>passenger-config validate-install</code>. For example:</p>
  <pre class="highlight shell"><span class="prompt">$ </span>passenger-config validate-install
  <span class="output">* Checking whether this Phusion Passenger install is in PATH... ✓
  * Checking whether there are no other Phusion Passenger installations... ✓</span></pre>
</div>

## Installation in production

Installation in production is a bit different. We will cover that later in the <a href="../../deploy/python/">deployment tutorial</a>.
`

		switch (this.props.currentLanguage) {
		default:
		case 'Ruby':
			body = rubyBody;
			break;
		case 'Python':
		case 'Node':
		case 'Meteor':
			body = otherBody;
			break;
		}
		
		return (
			<div>
				<Markdown source={header} />
				<Markdown escapeHtml={false} source={body} />
				<NextStep name="The 'Passenger' command" path="/tutorials/the_passenger_command/" />
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
