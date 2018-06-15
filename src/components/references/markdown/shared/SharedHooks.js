import React, { Component } from 'react';
import Markdown from 'react-markdown';

class SharedHooks extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
## How to define hooks

Apache
: You can define hooks by setting the configuration option:

	PassengerCtl hook_<HOOK NAME> <COMMAND TO EXECUTE>

Nginx
: You can define hooks by setting the configuration option:

    passenger_ctl hook_<HOOK NAME> <COMMAND TO EXECUTE>;

Standalone
: You can define hooks using [\`--ctl\` / "ctls"]("/config/standalone/reference/index.html"#--ctl-ctls):

    --ctl hook_<HOOK NAME>=<COMMAND TO EXECUTE>

## Example

The hook system is best demonstrated with a simple example. In the following example we will hook into the \`attached_process\` event. This event is called whenever Passenger has successfully spawned an application processes and added it to the process pool. We print the process's PID and application root.

First, let's create a script \`/home/phusion/attached.sh\` which is to be called during the hook.

~~~bash
#!/bin/sh
echo "Attached process $PASSENGER_PROCESS_PID for app $PASSENGER_APP_ROOT."
~~~

Then we make it executable:

~~~bash
chmod +x /home/phusion/attached.sh
~~~

And we define the hook in the configuration file:

<table class="table table-bordered table-striped">
  <tr>
    <td>Apache</td>
    <td><pre class="highlight">PassengerCtl hook_attached_process /home/phusion/attached.sh</pre></td>
  </tr>
  <tr>
    <td>Nginx, Standalone</td>
    <td><pre class="highlight">passenger_ctl hook_attached_process /home/phusion/attached.sh;</pre></td>
  </tr>
  <tr>
    <td>Standalone</td>
    <td><pre class="highlight">passenger start --ctl hook_attached_process=/home/phusion/attached.sh</pre></td>
  </tr>
</table>

Now restart the web server and access a web app hosted by Passenger. You should see our message in the web server error log:

~~~
[ 2013-12-10 16:12:21.6456 28934/0x1064cb000 Hooks.h:129 ]: Running attached_process hook script: /home/phusion/attached.sh
Attached process 28303 for app /webapps/foobar.
[ 2013-12-10 16:12:21.6580 28934/0x1064cb000 Hooks.h:161 ]: Hook script /home/phusion/attached.sh (PID 28948) exited with status 0
~~~

## Environment

A lot of information is passed to hook scripts in the form of environment variables. They are all uppercase and begin with \`PASSENGER_\`. Some environment variables are passed to all hook scripts, others are passed depending on the hook.

Here are some of the environment variables which are passed to all hooks, unless documented otherwise:

 * \`PASSENGER_HOOK_NAME\`
 * \`PASSENGER_VERSION\`
 * \`PASSENGER_PASSENGER_ROOT\`
 * \`PASSENGER_INSTANCE_DIR\`
 * \`PASSENGER_INSTANCE_REGISTRY_DIR\`

## Blocking and concurrency

Except when otherwise documented, all hooks block in the background. That is, while your hook command is running, Passenger can still handle web requests, but the background thread which is running your hook will be blocked and won't be able to perform any further operations. For example, if you wrote a hook script for the \`attached_process\` event, then Passenger won't be able to attach further processes until your hook script finishes. You should therefore be careful when writing hook scripts.

If you have a bug in your script and it blocks, then you will be able to see that using the command \`passenger-status --show=backtraces\` which prints the backtraces of all threads in the Passenger core process. Look for the \`runSingleHookScript\` function in the backtrace. The following example shows at line 2 that Passenger is waiting for the hook script \`/home/phusion/badscript.sh\`.

~~~
Thread 'Group process spawner: /home/phusion/webapp.test#default' (0x1062d4000):
     in 'bool Passenger::runSingleHookScript(Passenger::HookScriptOptions &, const string &, const vector<pair<string, string> > &)' (Hooks.h:116) -- /home/phusion/badscript.sh
     in 'bool Passenger::runHookScripts(Passenger::HookScriptOptions &)' (Hooks.h:159)
     in 'void Passenger::ApplicationPool2::Group::spawnThreadRealMain(const SpawnerPtr &, const Passenger::ApplicationPool2::Options &, unsigned int)' (Implementation.cpp:878)
~~~

Hooks may be called concurrently, because Passenger sometimes uses multiple background threads. For example, while the \`attached_process\` hook is being called, a \`detached_process\` hook may be called, perhaps even for the same application. It is your responsibility to ensure that your hook scripts are concurrency-safe, e.g. by employing locks and other concurrency control techniques.

## Error handling

If a hook script fails -- that is, if it exits with anything other than exit code 0 -- then the error handling depends on the hook. Some hooks will abort, other hooks will ignore the error. In all cases, the result of the hook script is printed to the log.

## Compatibility

Because hooks are inherently tied to the implementation of Passenger, there is no guarantee that hooks that currently work will continue to be available in the future versions of Passenger. The availability of hooks is very much tied to the specific version of Passenger.

## Available hooks

### before_watchdog_initialization

<table class="table table-bordered table-condensed table-condensed-width">
  <tr>
    <th>Version</th>
    <td>4.0.28 and later</td>
  </tr>
  <tr>
    <th>Error handling</th>
    <td>Aborts on hook script errors.</td>
  </tr>
</table>

Called at the very beginning of Passenger's life cycle, during the start of the Watchdog process. The first hook is called before initialization is performed (before the Passenger core process is started).

Errors in the hook script cause Passenger to abort.

### after_watchdog_initialization

<table class="table table-bordered table-condensed table-condensed-width">
  <tr>
    <th>Version</th>
    <td>4.0.28 and later</td>
  </tr>
  <tr>
    <th>Error handling</th>
    <td>Aborts on hook script errors.</td>
  </tr>
</table>

Like [before_watchdog_initialization](#before_watchdog_initialization), but called after initialization of all Passenger agent processes.

Errors in the hook script cause Passenger to abort.

### before_watchdog_shutdown

<table class="table table-bordered table-condensed table-condensed-width">
  <tr>
    <th>Version</th>
    <td>4.0.28 and later</td>
  </tr>
  <tr>
    <th>Error handling</th>
    <td>Aborts on hook script errors.</td>
  </tr>
</table>

Called after an exit signal has been noticed (e.g. webserver exit), before the Watchdog starts terminating agent processes.

### after_watchdog_shutdown

<table class="table table-bordered table-condensed table-condensed-width">
  <tr>
    <th>Version</th>
    <td>4.0.28 and later</td>
  </tr>
  <tr>
    <th>Error handling</th>
    <td>Aborts on hook script errors.</td>
  </tr>
</table>

Called after the Watchdog is done and about to exit.

### attached_process

<table class="table table-bordered table-condensed table-condensed-width">
  <tr>
    <th>Version</th>
    <td>4.0.28 and later</td>
  </tr>
  <tr>
    <th>Error handling</th>
    <td>Errors in the hook script are ignored.</td>
  </tr>
</table>

Called when Passenger has successfully spawned an application processes and added it to the process pool.

Extra environment variables:

 * \`PASSENGER_PROCESS_PID\`
 * \`PASSENGER_APP_ROOT\`

### detached_process

<table class="table table-bordered table-condensed table-condensed-width">
  <tr>
    <th>Version</th>
    <td>4.0.28 and later</td>
  </tr>
  <tr>
    <th>Error handling</th>
    <td>Errors in the hook script are ignored.</td>
  </tr>
</table>

Called when Passenger has removed an application process from the process pool. This could happen when:

 * The process has crashed, and Passenger noticed it.
 * Passenger has shut down a process because it's been idle for too long.
 * The administrator configured different resource limits, and Passenger is starting or shutting down processes in response.
 * Passenger itself is shutting down.

Extra environment variables:

 * \`PASSENGER_PROCESS_PID\`
 * \`PASSENGER_APP_ROOT\`

### spawn_failed

<table class="table table-bordered table-condensed table-condensed-width">
  <tr>
    <th>Version</th>
    <td>4.0.49 and later</td>
  </tr>
  <tr>
    <th>Error handling</th>
    <td>Aborts on hook script errors.</td>
  </tr>
</table>

Called when an application process could not be spawned. This could happen when:

 * The application failing to start. For example: bugs in the application, database problems causing the application to crash, incorrectly installed dependencies.
 * Operating system-level problems, such as running out of memory.
 * The application taking too long to start, and hitting Passenger's timeout.

### queue_full_error

<table class="table table-bordered table-condensed table-condensed-width">
  <tr>
    <th>Version</th>
    <td>5.0.0 RC 1 and later</td>
  </tr>
  <tr>
    <th>Error handling</th>
    <td>Errors in the hook script are ignored.</td>
  </tr>
</table>

Passenger [rejects new requests (default: HTTP 503) while the request queue is full](<%= url_for_config_option(:max_request_queue_size, locals) %>). This hook gets called for each rejection.

This hook does not block anything, because it's always run in an extra background thread.

Extra environment variables:

\`PASSENGER_APP_ROOT\`
: The path to the application that failed to spawn.

\`PASSENGER_APP_GROUP_NAME\`
: The configured app group name.

\`PASSENGER_ERROR_MESSAGE\`
: An error message that describes the problem.

\`PASSENGER_ERROR_ID\`
: A unique ID for this error event. If you search for this ID in the web server error log files, you should be able to find details about the error.

\`PASSENGER_APP_ERROR_MESSAGE\`
: Output captured from the application at the time the error occurred.

### max_request_time_reached

<table class="table table-bordered table-condensed table-condensed-width">
  <tr>
    <th>Version</th>
    <td>5.0.2 and later. Available in <a href="https://www.phusionpassenger.com/enterprise">Passenger Enterprise</a> only.</td>
  </tr>
  <tr>
    <th>Error handling</th>
    <td>Errors in the hook script are ignored.</td>
  </tr>
</table>

Called when a [max request time limit]("/config/nginx/reference/index.html"#passenger_max_request_time) has been reached. Please note that as soon as this hook has finished executing, the application process will be killed with SIGKILL. So if you want to perform any diagnostics on the process in question (e.g. with strace, gdb, etc), please do not exit your hook script until you've obtained all the diagnostics you want.

At present, this hook blocks web request handling. This may be solved in a future version of Passenger.

Extra environment variables:

\`PASSENGER_APP_ID\`
: The PID of the process whose request took too long.

\`PASSENGER_REQUEST_PATH\`
: The path of the request that took took long, e.g. "/photos/edit?id=123".

\`PASSENGER_REQUEST_HOST\`
: The host name of the request that took too long, e.g. "www.example.com". This environment variable is not set if the request doesn't contain a Host header.
`
			} />
		)
	}
}

export default SharedHooks;
