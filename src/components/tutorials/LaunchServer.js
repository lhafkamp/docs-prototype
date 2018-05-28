import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';
import queryString from 'query-string';

import NextStep from '../NextStep';

class LaunchServer extends Component {
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
		const body = `
# Launching a server on Digital Ocean

<div class="info">
  This page describes how to launch a server on <strong>Digital Ocean</strong>. Is this not the infrastructure that you are using? <a href="/walkthroughs/deploy/#{language_type}/index.html">Go back to the infrastructure selection page.</a>
</div>

On this page, we will launch a Digital Ocean server (or "droplets" as Digital Ocean calls them) and login to that server. If you have already launched a server, then you can [skip to the next page](<%= spec[:url] %>).

<div class="row row-instruction">
  <div class="col-md-6">
    <p>
      <a href="https://cloud.digitalocean.com/" target="_blank">Login to your Digital Ocean account</a> click on <em>Create Droplet</em>.
    </p>
  </div>
  <div class="col-md-6">
    <img src="/img/digitalocean/digital_ocean_create_droplet.png" class="img-thumbnail">
  </div>
</div>
<div class="row row-instruction">
  <div class="col-md-6">
    <p>
      Give your droplet a host name, then select an image. You are free to choose any Linux/Unix image, but for demonstration purposes let us pick the <em>Ubuntu 14.04 x64</em> image.
    </p>
  </div>
  <div class="col-md-6">
  	<img src="/img/digitalocean/digital_ocean_image.png" class="img-thumbnail" style="max-height: 15em">
  </div>
</div>
<div class="row row-instruction">
  <div class="col-md-6">
    <p>
      Select a droplet size. For smaller web apps, the 1 GB plan is enough.
    </p>
  </div>
  <div class="col-md-6">
		<img src="/img/digitalocean/digital_ocean_size.png" class="img-thumbnail">
  </div>
</div>
<div class="row row-instruction">
  <div class="col-md-6">
    <p>
      Scroll down and click <em>Create Droplet</em>.
    </p>
  </div>
  <div class="col-md-6">
    <img src="/img/digitalocean/digital_ocean_final.png" class="img-thumbnail">
  </div>
</div>
<div class="row row-instruction">
  <div class="col-md-6">
    <p>
      Wait until the droplet is created.
    </p>
  </div>
  <div class="col-md-6">
    <img src="/img/digitalocean/digital_ocean_creating.png" class="img-thumbnail">
  </div>
</div>
<div class="row row-instruction">
  <div class="col-md-6">
    <p>
      When the droplet is created, Digital Ocean will display its IP address at the top left corner of your dashboard, right under the server name. Use this IP address to login to your server.
    </p>
  </div>
  <div class="col-md-6">
    <img src="/img/digitalocean/digital_ocean_ip.png" class="img-thumbnail">
  </div>
</div>
<div class="row row-instruction">
  <div class="col-md-6">
    <p>
      Use SSH to login to your server. The username is <em>root</em>.
    </p>
  </div>
  <div class="col-md-6">
    <pre class="highlight" style="word-wrap: initial"><span class="prompt">$ </span>ssh root@45.55.91.235
<span class="output">The authenticity of host '45.55.91.235 (45.55.91.235)' can't be established.
RSA key fingerprint is d3:c0:b7:b9:f6:6e:a6:85:62:f8:5b:ba:f3:99:51:05.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '45.55.91.235' (RSA) to the list of known hosts.
Welcome to Ubuntu 14.04.2 LTS (GNU/Linux 3.13.0-52-generic x86_64)
<br>root@passengertest:~#</span></pre>
  </div>
</div>
`

		return (
			<div>
				<Markdown escapeHtml={false} source={body} />
				<NextStep name="Installations" path="/tutorials/deploy_to_production/installations/" />
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

export default connect(mapStateToProps)(LaunchServer);
