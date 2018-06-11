import React, { Component } from 'react';
import Markdown from 'react-markdown';

class NodeInstallLanguage extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
Before you can deploy your app on the production server, you need to install Node.js. Here's how you can do that:

<table class="table table-bordered table-striped">
  <tr>
    <td>
      Debian, Ubuntu
    </td>
    <td>
      <p>Run the following commands to install Node.js from the <a href="https://nodesource.com/">NodeSource</a> APT repository. With these commands, we also install a compiler so that we are able to install native addons from npm.</p>
      <pre class="highlight"><span class="prompt">$ </span>sudo apt-get update
<span class="prompt">$ </span>sudo apt-get install -y curl apt-transport-https ca-certificates &amp;&amp;
  curl --fail -ssL -o setup-nodejs https://deb.nodesource.com/setup_6.x &amp;&amp;
  sudo bash setup-nodejs &amp;&amp;
  sudo apt-get install -y nodejs build-essential</pre>
    </td>
  </tr>
	<tr>
    <td>
      Red Hat, CentOS, Fedora
    </td>
    <td><p>Run the following commands to enable <a href="https://fedoraproject.org/wiki/EPEL">EPEL</a> and to install Node.js from the <a href="https://nodesource.com/">NodeSource</a> YUM repository. With these commands, we also install a compiler so that we are able to install native addons from npm.</p>
<pre class="highlight"><span class="prompt">$ </span>sudo yum install -y epel-release curl
<span class="prompt">$ </span>curl --fail -sSL -o setup-nodejs https://rpm.nodesource.com/setup_6.x
<span class="prompt">$ </span>sudo bash setup-nodejs
<span class="prompt">$ </span>sudo yum install -y nodejs gcc-c++ make</pre>
    </td>
  </tr>
  <tr>
    <td>
      Gentoo
    </td>
    <td>
      <pre class="highlight"><span class="prompt">$ </span>sudo emerge nodejs</pre>
    </td>
  </tr>
  <tr>
    <td>
      Arch Linux
    </td>
    <td>
      <pre class="highlight"><span class="prompt">$ </span>sudo pacman -S nodejs npm</pre>
    </td>
  </tr>
  <tr>
    <td>
      macOS
    </td>
    <td>
      Please download the Node.js macOS installer from <a href="https://nodejs.org/download/">the Node.js download page</a> and run it.
    </td>
  </tr>
  <tr>
    <td>
      Other Linux operating systems (32-bit or 64-bit only)
    </td>
    <td>
      Please download either the 32-bit or 64-bit Node.js Linux binaries from <a href="https://nodejs.org/download/">the Node.js download page</a>.
    </td>
  </tr>
  <tr>
    <td>
      Other operating systems
    </td>
    <td>
      Please install Node.js from source from <a href="http://www.nodejs.org/">www.nodejs.org</a>.
    </td>
  </tr>
</table>

<div class="language-installed">
	<h3>All done!</h3>
	<p>Congratulations, you have now installed Node.js!</p>
</div>
`
			} />
		)
	}
}

export default NodeInstallLanguage;
