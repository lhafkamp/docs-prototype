import React, { Component } from 'react';
import Markdown from 'react-markdown';

import { OptionsContext }  from './options-context';
import Test  from './Test';

class FundamentalConcepts extends Component {
	render() {
		const header = `
# Fundamental concepts`;

		return (
			<div>
				<Markdown source={header} />
				<OptionsContext.Consumer>
					{options => (
						<div>
							<Test test={options.changeLanguage} />
							<p>{options.currentLanguage}</p>
						</div>
					)}
				</OptionsContext.Consumer>
			</div>
		);
	}
}

export default FundamentalConcepts;
