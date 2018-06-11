import React, { Component } from 'react';
import Markdown from 'react-markdown';

class PythonInstallLanguage extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
<h2>Installing Python</h2>

Before you can deploy your app on the production server, you need to install Python. Here's how you can do that:

<table class="table table-bordered table-striped">
  <tr>
    <td>
      Debian, Ubuntu
    </td>
    <td>
      <pre class="highlight"><span class="prompt">$ </span>sudo apt-get update
<span class="prompt">$ </span>sudo apt-get install -y python</pre>
    </td>
  </tr>
  <tr>
    <td>
      Red Hat, CentOS, Fedora, Amazon Linux, Scientific Linux
    </td>
    <td>
      <pre class="highlight"><span class="prompt">$ </span>sudo yum -y install python python-pip</pre>
    </td>
  </tr>
  <tr>
    <td>
      macOS
    </td>
    <td>
      You don't have to do anything. Python is already installed.
    </td>
  </tr>
  <tr>
    <td>
      Other operating systems
    </td>
    <td>
      Please install Python from <a href="http://www.python.org/">www.python.org</a>.
    </td>
  </tr>
</table>

<div class="language-installed">
	<h3>All done!</h3>
	<p>Congratulations, you have now installed Python!</p>
</div>
`
			} />
		)
	}
}

export default PythonInstallLanguage;
