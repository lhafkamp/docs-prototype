import React, { Component } from 'react';

import '../css/components/footer.css';

class Dropdown extends Component {
	render() {
		return (
			<footer>
				<div>
					<img src="/img/footer/passenger.svg" alt="Passenger"/>
					<p>Documentation licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY SA 4.0</a>.</p>
					<ul>
						<li>Follow us on: <a href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fwww.phusionpassenger.com%2Flibrary%2F&ref_src=twsrc%5Etfw&screen_name=phusion_nl&tw_p=followbutton"><img src="/img/footer/twitter.svg" alt="twitter"/></a></li>
						<li>Passenger: <a href="https://github.com/phusion/passenger"><img src="/img/footer/github.svg" alt="Passenger Github"/></a></li>
						<li>Passenger docs: <a href=""><img src="/img/footer/github.svg" alt="Passenger docs Github"/></a></li>
					</ul>
					<div>
						<p>Copyright © 2008-2018 Phusion Holding B.V. and contributors to the Passenger Library.</p>
						<p>"Phusion", "Phusion Passenger", "Passenger" and the Phusion pinwheel logo are registered trademarks of Phusion Holding B.V.</p>
					</div>
				</div>
			</footer>
		);
	}
}

export default Dropdown;
