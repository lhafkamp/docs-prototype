import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

class ProcessManagement extends Component {
	render() {
		// markdown variables

		const header = `
# Process management`

		const subTitle = `
Passenger manages multiple processes in order to maximize stability and performance. Learn how Passenger manages processes and learn about Passenger's process management tools.`

		const body = `
## Introduction

You have learned in [Fundamental concepts](fundamental_concepts.html) that at its core, Passenger is a process manager. Instead of running an application inside its process space, Passenger launches the application as external processes, and manages them. Passenger load balances traffic between processes, shuts down processes when they're no longer needed or when they misbehave, keeps them running and restarts them when they crash, etc.

<div class="info">
  If you're not familiar with the concept of processes (and threads), please read <a href="<%= url_for '/indepth/processes.html' %>">About processes</a> first. There are a number of caveats that you should know about, such as the fact that processes don't share memory with each other.
</div>

Initially, Passenger only spawns one application process. But sometimes it may decide to spawn multiple processes. Here are the reasons why this is sometimes beneficial:

 * **Performance**<br>
   The more processes you run, the better the CPU core utilization, up until the hardware limit.
 * **I/O concurrency**<br>
   The more processes you run, the greater the amount of available I/O concurrency. This makes your app perform better.
 * **Stability**<br>
   If an application process crashes, other processes are unaffected and can take over while Passenger restarts the crashed process.
 * **Keeping problems in check**<br>
   Many problems, such as leaking memory or getting stuck, can be kept in check by restarting the process where the problems occurred.

## Working with a single process

When you start Passenger Standalone, it spawns one process. You can see this in action as follows. First, start Passenger Standalone:

<pre class="highlight">bundle exec passenger start</pre>

Next, open a new terminal and run \`passenger-status\` to query the process management status of the Passenger instance:

<pre class="highlight">
<span>cd /path-to-your-app</span>
<span>bundle exec passenger-status</span>
<span class="output">Version : 5.0.6
Date    : 2015-04-14 21:55:30 +0100
Instance: 25002
----------- General information -----------
Max pool size : 6                       <span class="label label-info">1</span>
Processes     : 1
Requests in top-level queue : 0

----------- Application groups -----------
/Users/phusion/testapp#default:         <span class="label label-info">2</span>
  App root: /Users/phusion/testapp
  Requests in queue: 0
  * PID: 25012   Sessions: 0       Processed: 1       Uptime: 9s      <span class="label label-info">3</span>
    CPU: 0%      Memory  : 14M     Last used: 3s ago</span></pre>

There are several things you see here:

 1. \`Max pool size\` indicates the maximum number of processes that Passenger will keep around. There is a limit because each process consumes memory, so having too many processes can crash the server. This limit is configurable through the \`--max-pool-size\` command line option. Passenger won't ever pass this limit.
 2. Passenger is serving one application, /Users/phusion/testapp.
 3. There is a single process for that application, namely PID 25012. It is not using any CPU right now, and its memory usage is 14 MB.

<div class="warning">
  <h3 class="notoc">Notice the dash in <code>passenger-status</code></h3>
  <p>The command for querying the process management status is <code>passenger-status</code> with a dash. Do not confuse it with <code>passenger status</code> (without a dash). This latter command is for checking whether a Passenger Standalone instance is running.</p>
</div>

## Working with multiple processes
### Seeing it in action

The easiest way to see Passenger handling multiple processes is by passing \`--min-instances 2\`. This tells Passenger to keep at least 2 processes around. The default value for this option is 1, which is why in the previous step you only saw 1 process.

Stop your previous Passenger instance. In the terminal where \`passenger start\` is running, press Ctrl-C:

<pre class="highlight">bundle exec passenger start
<span class="output">...
(press Ctrl-C here)
Stopping web server... done!</span></pre>

Then re-run Passenger with \`--min-instances 2\`:

<pre class="highlight">bundle exec passenger start --min-instances 2</pre>

Switch to the second terminal again and run \`passenger-status\` again:

<pre class="highlight">
<span>cd /path-to-your-app</span>
<span>bundle exec passenger start</span>
<span class="output">Version : 5.0.6
Date    : 2015-04-14 21:57:30 +0100
Instance: 25002
----------- General information -----------
Max pool size : 6
Processes     : 2
Requests in top-level queue : 0

----------- Application groups -----------
/Users/phusion/testapp#default:
  App root: /Users/phusion/testapp
  Requests in queue: 0
  * PID: 25015   Sessions: 0       Processed: 2       Uptime: 9s
    CPU: 0%      Memory  : 14M     Last used: 3s ago
  * PID: 25016   Sessions: 0       Processed: 0       Uptime: 9s
    CPU: 0%      Memory  : 14M     Last used: 3s ago</span></pre>

As you can see, there are now two processes, namely PID 25015 and 25016.

### Processes are supervised

The cool thing about Passenger is that it restarts processes that crash! This way you have to worry less about application bugs taking the website down.

Let us try it out by killing the second process, simulating a crash:

<pre class="highlight"><span class="prompt">$ </span>kill 25016</pre>

In our example, the second process's PID is 25016. The PIDs will be different on your machine, so be sure to substitute 25016 with an appropriate value.

Wait 5 seconds, then run \`passenger-status\`. Notice that process 25016 is gone and that it has been replaced by 25017!

<pre class="highlight">bundle exec passenger-status
<span class="output">Version : 5.0.6
Date    : 2015-04-14 21:58:30 +0100
Instance: 25002
----------- General information -----------
Max pool size : 6
Processes     : 2
Requests in top-level queue : 0

----------- Application groups -----------
/Users/phusion/testapp#default:
  App root: /Users/phusion/testapp %>
  Requests in queue: 0
  * PID: 25015   Sessions: 0       Processed: 2       Uptime: 45s
    CPU: 0%      Memory  : 14M     Last used: 45s ago
  * PID: 25017   Sessions: 0       Processed: 0       Uptime: 9s       <span class="label label-info">This is the newly spawned process</span>
    CPU: 0%      Memory  : 14M     Last used: 3s ago</span></pre>

<!-- TODO: add a note that discourages the use of 'kill' in production in favor of 'passenger-config detach-process' -->

<div class="info">
  <p>While a process is being restarted, Passenger will let other processes (if any) process traffic. That way, downtime is minimized in the event of a process crash.</p>
</div>

### Processes are dynamically scaled
Passenger load balances traffic over processes in order to improve performance and concurrency. Passenger keeps track of the number of requests that each process is handling. When a new request comes in, Passenger forwards the request to the process that is handling the least number of requests.

Passenger automatically scales the number of processes based on traffic. The more traffic, the more processes Passenger spawns, up to the \`--max-pool-size\` limit. This limit defaults to 6. Passenger also shuts down processes that haven't handled traffic for a while, in order to conserve resources. This is especially useful when you're hosting multiple apps on a server with limited resources.

You can see some of this in action by sending a large number of requests to Passenger, for example using the [wrk](https://github.com/wg/wrk) tool. Run this to open 200 connections to Passenger in 16 threads:

<pre class="highlight"><span class="prompt">$ </span>wrk -t 16 -c 200 http://0.0.0.0:3000/</pre>

If you run \`passenger-status\` again, you should see many processes:

<pre class="highlight">bundle exec passenger-status
<span class="output">Version : 5.0.6
Date    : 2015-04-14 22:05:30 +0100
Instance: 25002
----------- General information -----------
Max pool size : 6
Processes     : 6
Requests in top-level queue : 0

----------- Application groups -----------
/Users/phusion/testapp#default:
  App root: /Users/phusion/testapp
  Requests in queue: 0
  * PID: 25015   Sessions: 0       Processed: 84      Uptime: 9s
    CPU: 0%      Memory  : 14M     Last used: 15s ago
  * PID: 25016   Sessions: 0       Processed: 84      Uptime: 9s
    CPU: 0%      Memory  : 14M     Last used: 15s ago
  * PID: 25017   Sessions: 0       Processed: 83      Uptime: 9s
    CPU: 0%      Memory  : 14M     Last used: 15s ago
  * PID: 25018   Sessions: 0       Processed: 83      Uptime: 9s
    CPU: 0%      Memory  : 14M     Last used: 15s ago
  * PID: 25019   Sessions: 0       Processed: 83      Uptime: 9s
    CPU: 0%      Memory  : 14M     Last used: 15s ago
  * PID: 25020   Sessions: 0       Processed: 83      Uptime: 9s
    CPU: 0%      Memory  : 14M     Last used: 15s ago</span></pre>

By default, Passenger shuts down processes that haven't handled traffic for 5 minutes (300 seconds). If you wait 5 minutes and run \`passenger-status\` again, you should see that only two processes are still alive:

<pre class="highlight"><span class="prompt">$ </span>sleep 300
bundle exec passenger-status
<span class="output">Version : 5.0.6
Date    : 2015-04-14 22:05:30 +0100
Instance: 25002
----------- General information -----------
Max pool size : 6
Processes     : 6
Requests in top-level queue : 0

----------- Application groups -----------
/Users/phusion/testapp#default:
  App root: /Users/phusion/testapp
  Requests in queue: 0
  * PID: 25015   Sessions: 0       Processed: 84      Uptime: 6m 23s
    CPU: 0%      Memory  : 14M     Last used: 6m 1s ago
  * PID: 25016   Sessions: 0       Processed: 84      Uptime: 6m 23s
    CPU: 0%      Memory  : 14M     Last used: 6m 1s ago</span></pre>


`
		
		return (
			<div>
				<Markdown source={header} />
				<Markdown source={subTitle} />
				<Markdown escapeHtml={false} source={body} />
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentLanguage: state.currentLanguage,
		currentIntegration: state.currentIntegration
	}
}

export default connect(mapStateToProps)(ProcessManagement);
