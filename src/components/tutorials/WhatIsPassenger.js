import React, { Component } from 'react';
import Markdown from 'react-markdown';
import ReactPlayer from 'react-player';

class WhatIsPassenger extends Component {
	render() {
		const header = `
# What is Passenger?`;
		
		const body = `Phusion Passenger is an open source **web application server**. 
It handles HTTP requests, manages processes and resources, and enables administration, 
monitoring and problem diagnosis.

Passenger is very easy to use, makes deploying in production much easier and is scalable. If 
you aren't already familiar with the benefits, you can [learn more about them](https://www.phusionpassenger.com/advantages).

Passenger supports multiple programming languages, of which Ruby is one. 
Passenger can also serve multiple applications at the same time (it is multitenant).`;

		return (
			<div>
				<Markdown source={ header } />
				<ReactPlayer className="video-player" url='https://player.vimeo.com/external/224923750.hd.mp4?s=6931550c8a2bedabba0822a6ec7966c45ee1fbc4&profile_id=174" type="video/mp4' controls />
				<p className="video-sub-text">Phusion Passenger - the smart app server</p>
				<Markdown source={ body } />
				
				<div className="supported-logos">
					<strong>Supported languages:</strong>
					<div className="logos">
						<div>
							<img src="/img/ruby.svg" alt="ruby"/>
							<span>Ruby</span>
						</div>
						<div>
							<img src="/img/node.svg" alt="node"/>
							<span>Node</span>
						</div>
						<div>
							<img src="/img/python.svg" alt="python"/>
							<span>Python</span>
						</div>
						<div>
							<img src="/img/meteor.svg" alt="meteor"/>
							<span>Meteor</span>
						</div>
					</div>

					<strong>Supported integrations:</strong>
					<div className="logos">
						<div>
							<img src="/img/nginx.svg" alt="nginx"/>
							<span>Nginx</span>
						</div>
						<div>
							<img src="/img/apache.svg" alt="apache"/>
							<span>Apache</span>
						</div>
						<div>
							<img src="/img/passenger_logo.svg" alt="passenger logo"/>
							<span>Standalone</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WhatIsPassenger;
