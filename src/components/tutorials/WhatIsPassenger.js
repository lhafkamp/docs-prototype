import React, { Component } from 'react';
import Markdown from 'react-markdown';

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
				<Markdown source={ body } />
			</div>
		);
	}
}

export default WhatIsPassenger;
