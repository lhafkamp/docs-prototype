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
		return (
			<div id="deploy-to-production">
				<RubyHeroku />
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
