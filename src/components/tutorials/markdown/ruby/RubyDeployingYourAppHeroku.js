import React, { Component } from 'react';
import Markdown from 'react-markdown';

class RubyDeployingYourAppHeroku extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
<h1 class="solo-h1">Deploying your Ruby app on a Heroku production server</h1>

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
			} />
		)
	}
}

export default RubyDeployingYourAppHeroku;
