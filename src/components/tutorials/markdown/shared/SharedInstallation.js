import React, { Component } from 'react';
import Markdown from 'react-markdown';

class SharedInstallation extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
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

Installation in production is a bit different. We will cover that later in the [deployment tutorial](/tutorials/deploy_to_production/).
`
			} />
		)
	}
}

export default SharedInstallation;
