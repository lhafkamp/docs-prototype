import React, { Component } from 'react';
import Markdown from 'react-markdown';

class NginxInstallingPassenger extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
<h2 id="select_os">Step 2: Select operating system / installation method</h2>

Please select an operating system or installation method.

<div>
	<select id="os_install_select">
		<option value="osx">macOS</option>
	</select>
	<span class="arrow-down"></span>
</div>

<h2>Step 3: install Passenger package</h2>
<p>You can install Passenger through <a href="http://brew.sh/">Homebrew</a>:</p>
<pre class="highlight shell">
<span class="prompt">$ </span>brew install nginx --with-passenger</pre>
<p>
  Not using Homebrew? Please <a href="<%= menu_selection_url %>">go back to the operating system selection menu</a> and choose "Other" as operating system</a>.
</p>

  <h2>Step 4: enable the Passenger Nginx module and restart Nginx</h2>
  <p>
    Passenger is now installed, but it still needs to be enabled inside Nginx. Run <code>brew info nginx --with-passenger</code> and follow the instructions in the "Caveats" section:
  </p>
  <pre class="highlight shell"><span class="prompt">$ </span>brew info nginx --with-passenger
<span class="output">...
==&gt; Caveats
...<br />
To activate Passenger, ...
(...more instructions that you should follow...)</span></pre>

  <p>When you are done following the instructions, restart Nginx:</p>
  <pre class="highlight shell"><span class="prompt">$ </span>sudo launchctl unload /usr/local/opt/nginx/*.plist
<span class="prompt">$ </span>sudo launchctl load /usr/local/opt/nginx/*.plist</pre>

<h2>Step 5: check installation</h2>
<p>After installation, please validate the install by running <code>sudo /usr/local/bin/passenger-config validate-install</code>. For example:</p>
<pre class="highlight shell"><span class="prompt">$ </span>sudo /usr/local/bin/passenger-config validate-install
<span class="output"> * Checking whether this Phusion Passenger install is in PATH... ✓
 * Checking whether there are no other Phusion Passenger installations... ✓</span></pre>
<p>
  All checks should pass. If any of the checks do not pass, please follow the suggestions on screen.
</p>

<p>
  Finally, check whether Nginx has started the Passenger core processes. Run <code>sudo /usr/local/bin/passenger-memory-statspassenger-memory-stats</code>. You should see Nginx processes as well as Passenger processes. For example:
</p>
<pre class="highlight shell"><span class="prompt">$ </span>sudo /usr/local/bin/passenger-memory-stats
<span class="output">Version: 5.0.8
Date   : 2015-05-28 08:46:20 +0200
...<br />
---------- Nginx processes ----------
PID    PPID   VMSize   Private  Name
-------------------------------------
12443  4814   60.8 MB  0.2 MB   nginx: master process /usr/sbin/nginx
12538  12443  64.9 MB  5.0 MB   nginx: worker process
### Processes: 3
### Total private dirty RSS: 5.56 MB <br />
----- Passenger processes ------
PID    VMSize    Private   Name
--------------------------------
12517  83.2 MB   0.6 MB    PassengerAgent watchdog
12520  266.0 MB  3.4 MB    PassengerAgent server
12531  149.5 MB  1.4 MB    PassengerAgent logger
...</span></pre>
<p>
  If you do not see any Nginx processes or Passenger processes, then you probably have some kind of installation problem or configuration problem. Please refer to the <a href="/admin/nginx/troubleshooting/index.html">troubleshooting guide</a>.
</p>
`
			} />
		)
	}
}

export default NginxInstallingPassenger;
