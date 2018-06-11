import React, { Component } from 'react';
import Markdown from 'react-markdown';

class NodeInstallPassenger extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
Now we will install Passenger. After installing Passenger we can begin with deploying the app.


## Step 1: install Passenger packages
These commands will install Passenger + Nginx through Phusion's APT repository. If you already had Nginx installed, then these commands will upgrade Nginx to Phusion's version (with Passenger compiled in).

<pre class="highlight shell"><code><span class="c unselectable"># Install our PGP key and add HTTPS support for APT</span>sudo apt-get install -y dirmngr gnupg
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
sudo apt-get install -y apt-transport-https ca-certificates

<span class="c unselectable"># Add our APT repository</span>sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger trusty main > /etc/apt/sources.list.d/passenger.list'
sudo apt-get update

<span class="c unselectable"># Install Passenger + Nginx</span>sudo apt-get install -y nginx-extras passenger

</code></pre>

## Step 2: enable the Passenger Nginx module and restart Nginx

<p>Edit <code>/etc/nginx/nginx.conf</code> and uncomment <code>include /etc/nginx/passenger.conf;</code>. For example, you may see this:</p>
    <pre class="highlight"># include /etc/nginx/passenger.conf;</pre>
    <p>Remove the '#' characters, like this:</p>
    <pre class="highlight">include /etc/nginx/passenger.conf;</pre>
    
    <div class="note">
      <p>If you don't see a commented version of <code>include /etc/nginx/passenger.conf;</code> inside nginx.conf, then you need to insert it yourself. Insert it into /etc/nginx/nginx.conf inside the <code>http</code> block. For example:</p>
     <br />
     <pre class="highlight">...
  
http {
    <span class="nf">include /etc/nginx/passenger.conf;</span>
    ...
}</pre>
  </div>
  <p>
      When you are finished with this step, restart Nginx:
    </p>
    <pre class="highlight"><span class="prompt">$ </span>sudo service nginx restart</pre>

## Step 3: check installation

<p>After installation, please validate the install by running <code>sudo /usr/bin/passenger-config validate-install</code>. For example:</p>
<pre class="highlight shell"><span class="prompt">$ </span>sudo /usr/bin/passenger-config validate-install
<span class="output"> * Checking whether this Phusion Passenger install is in PATH... ✓
 * Checking whether there are no other Phusion Passenger installations... ✓</span></pre>
<p>
  All checks should pass. If any of the checks do not pass, please follow the suggestions on screen.
</p>

<p>
  Finally, check whether Nginx has started the Passenger core processes. Run <code>sudo /usr/sbin/passenger-memory-stats</code>. You should see Nginx processes as well as Passenger processes. For example:
</p>
<pre class="highlight shell"><span class="prompt">$ </span>sudo /usr/sbin/passenger-memory-stats
<span class="output">Version: 5.0.8
Date   : 2015-05-28 08:46:20 +0200
...
<br />---------- Nginx processes ----------
PID    PPID   VMSize   Private  Name
-------------------------------------
12443  4814   60.8 MB  0.2 MB   nginx: master process /usr/sbin/nginx
12538  12443  64.9 MB  5.0 MB   nginx: worker process
### Processes: 3
### Total private dirty RSS: 5.56 MB
<br />----- Passenger processes ------
PID    VMSize    Private   Name
--------------------------------
12517  83.2 MB   0.6 MB    PassengerAgent watchdog
12520  266.0 MB  3.4 MB    PassengerAgent server
12531  149.5 MB  1.4 MB    PassengerAgent logger
<br />...</span></pre>
<p>
  If you do not see any Nginx processes or Passenger processes, then you probably have some kind of installation problem or configuration problem. Please refer to the <a href="/admin/nginx/troubleshooting/index.html">troubleshooting guide</a>.
</p>

## Step 4: update regularly

Nginx updates, Passenger updates and system updates are delivered through the APT package manager regularly. You should run the following command regularly to keep them up to date:
<pre class="highlight"><span class="prompt">$ </span>sudo apt-get update
<span class="prompt">$ </span>sudo apt-get upgrade</pre>

You do not need to restart Nginx or Passenger after an update, and you also do not need to modify any configuration files after an update. That is all taken care of automatically for you by APT.
`
			} />
		)
	}
}

export default NodeInstallPassenger;
