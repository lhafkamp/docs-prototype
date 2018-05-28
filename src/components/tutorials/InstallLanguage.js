import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

function InstallRuby() {
	const body = `
<h2>Installing Ruby <small>with RVM</small></h2>

Before you can deploy your app on the production server, you need to install Ruby. In this tutorial we recommend that you use [Ruby Version Manager (RVM)](https://rvm.io/) for this purpose. RVM is a tool for installing and managing multiple Ruby versions.

There are other ways to install Ruby, e.g. through yum, apt-get, source tarball, rbenv and chruby. You *can* use one of those other installation methods if you so wish, and this tutorial will work fine even if you installed Ruby using one of those other installation methods. But the one that we recommend in this tutorial is RVM, because in our opinion it is the easiest option.

## Prepare the system

Ensure that curl and gpg are installed, as well as a compiler toolchain. Curl and gpg are needed for further installation steps, while the compiler toolchain is needed for installing common Ruby gems.

<table class="table table-bordered table-striped">
  <tr>
    <td>
      Debian, Ubuntu
    </td>
    <td>
      <pre class="highlight"><span class="prompt">$ </span>sudo apt-get update
<span class="prompt">$ </span>sudo apt-get install -y curl gnupg build-essential</pre>
    </td>
  </tr>
  <tr>
    <td>
      Red Hat, CentOS, Fedora, Amazon Linux, Scientific Linux
    </td>
    <td>
      <pre class="highlight"><span class="prompt">$ </span>sudo yum install -y curl gpg gcc gcc-c++ make</pre>
    </td>
  </tr>
  <tr>
    <td>
      macOS
    </td>
    <td>
      You don't have to do anything. They are already installed.
    </td>
  </tr>
</table>

## Install RVM

Run the following commands on your production server to install RVM:

<pre class="highlight"><span class="prompt">$ </span>sudo gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
<span class="prompt">$ </span>curl -sSL https://get.rvm.io | sudo bash -s stable
<span class="prompt">$ </span>sudo usermod -a -G rvm \`whoami\`</pre>

You may need to use gpg2 instead of gpg on some systems.

On systems where sudo is configured with \`secure_path\`, the shell environment needs to be modified to set \`rvmsudo_secure_path=1\`. \`secure_path\` is set on most Linux systems, but not on macOS. The following command tries to autodetect whether it is necessary to install \`rvmsudo_secure_path=1\`, and only installs the environment variable if it is the code.

<pre class="highlight"><span class="prompt">$ </span><span class="k">if</span> sudo grep -q secure_path /etc/sudoers; <span class="k">then</span> sudo sh -c <span class="s">"echo export rvmsudo_secure_path=1 >> /etc/profile.d/rvm_secure_path.sh"</span> &amp;&amp; echo Environment variable installed; <span class="k">fi</span></pre>

When you are done with all this, **relogin to your server** to activate RVM. This is important: if you don't relogin, RVM doesn't work. Also if you use gnu screen or another terminal multiplexer, RVM also won't work; you must use a plain ssh session.

## Install the Ruby version you want

Usually, installing the latest Ruby version will suffice. If you are deploying <a href="/walkthroughs/start/#{language_type}.html">#preparing-the-example-application">the example app from the quickstart</a>, then that example application works with all Ruby versions.

However, if you are deploying your own app, then your app may have a specific Ruby version requirement.

To install the latest version of Ruby, run:

<pre class="highlight"><span class="prompt">$ </span>rvm install ruby
<span class="prompt">$ </span>rvm --default use ruby</pre>

To install a specific version of Ruby, run:

<pre class="highlight"><span class="prompt">$ </span>rvm install ruby-<span class="si">X.X.X</span>
<span class="prompt">$ </span>rvm --default use ruby-<span class="si">X.X.X</span></pre>

Replace X.X.X with the Ruby version you want.

## Install Bundler

Bundler is a popular tool for managing application gem dependencies. We will use Bundler in this tutorial, so let us install it:

<pre class="highlight"><span class="prompt">$ </span>gem install bundler --no-rdoc --no-ri</pre>

## Optional: install Node.js if you're using Rails

If you are using Rails, then you must install Node.js. This is because Rails's asset pipeline compiler requires a Javascript runtime. The Node.js version does not matter.

If you do not use Rails then you can [skip to the next step](#heads-up-sudo-vs-rvmsudo).

To install Node.js:

<table class="table table-bordered table-striped">
  <tr>
    <td>
      Ubuntu
    </td>
    <td>
      <pre class="highlight">sudo apt-get install -y nodejs &amp;&amp;
sudo ln -sf /usr/bin/nodejs /usr/local/bin/node</pre>
    </td>
  </tr>
  <tr>
    <td>
      Debian &gt;= 7 (Wheezy or later)
    </td>
    <td>
      <p>Run the following commands to install Node.js from the <a href="https://nodesource.com/">NodeSource</a> APT repository.</p>
      <pre class="highlight"><span class="prompt">$ </span>sudo apt-get update &amp;&amp;
sudo apt-get install -y apt-transport-https ca-certificates &amp;&amp;
curl --fail -ssL -o setup-nodejs https://deb.nodesource.com/setup_8.x &amp;&amp;
sudo bash setup-nodejs &amp;&amp;
sudo apt-get install -y nodejs build-essential</pre>
    </td>
  </tr>
  <tr>
    <td>
      Red Hat, CentOS, Fedora, Amazon Linux, Scientific Linux
    </td>
    <td>
      <pre class="highlight"><span class="prompt">$ </span>sudo yum install -y epel-release
<span class="prompt">$ </span>sudo yum install -y --enablerepo=epel nodejs npm</pre>
    </td>
  </tr>
  <tr>
    <td>
      Other operating systems
    </td>
    <td>
      Please install Node.js from <a href="http://www.nodejs.org/">www.nodejs.org</a>.
    </td>
  </tr>
</table>

## Heads-up: sudo vs rvmsudo

One thing you should be aware of when using RVM, is that you should use \`rvmsudo\` instead of \`sudo\` when executing Ruby-related commands. This is because RVM works by manipulating environment variables. However, sudo nukes all environment variables for security reasons, which intereferes with RVM.

[Visit the RVM website to learn more about rvmsudo.](https://rvm.io/integration/sudo)

<div class="language-installed">
	<h3>All done!</h3>
	<p>Congratulations, you have now installed Ruby!</p>
</div>
`

	return (
		<Markdown escapeHtml={false} source={body} />
	)
}

function InstallPython() {
	const body = `
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

	return (
		<Markdown escapeHtml={false} source={body} />
	)
}

function InstallNode() {
	const body = `
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

	return (
		<Markdown escapeHtml={false} source={body} />
	)
}

function InstallMeteor() {
	const body = ''

	return (
		<Markdown escapeHtml={false} source={body} />
	)
}

class InstallLanguage extends Component {
	render() {
		let language;

		switch(this.props.currentLanguage) {
			default:
			case 'Ruby':
				language = <InstallRuby />
				break;
			case 'Python':
				language = <InstallPython />
				break;
			case 'Node':
				language = <InstallNode />
				break;
			case 'Meteor':
				language = <InstallMeteor />
				break;
		}

		return (
			<div>
				{language}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
	}
}

export default connect(mapStateToProps)(InstallLanguage);
