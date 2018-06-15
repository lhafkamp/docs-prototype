import React, { Component } from 'react';
import Markdown from 'react-markdown';

class NginxPerformanceTuning extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
## Performance tuning

### passenger_core_file_descriptor_ulimit

<table class="table table-bordered table-condensed">
  <tr>
    <th>Syntax</th>
    <td>passenger_core_file_descriptor_ulimit <em>integer</em>;</td>
  </tr>
  <tr>
    <th>Default</th>
    <td>Inherited from Nginx</td>
  </tr>
  <tr>
    <th>Since</th>
    <td>5.0.26</td>
  </tr>
  <tr>
    <th>Context</th>
    <td>http</td>
  </tr>
</table>

Sets the file descriptor operating system ulimit for the Passenger core process. If you see "too many file descriptors" errors on a regular basis, then increasing this limit will help.

The default value is inherited from the process that started Passenger, which is the Nginx master process in the Nginx integration mode. Assuming Passenger has enough access rights (normally true if the Nginx master process runs as root), it can override its ulimit to the requested setting.

On most operating systems, the default ulimit can also be configured with a config file such as /etc/security/limits.conf, but since ulimits are *inherited* on a process basis instead of set globally, using that file to change ulimits is usually an error-prone process. This Passenger configuration option provides an easier and high confidence way to set the file descriptor ulimit.

Note that application ulimits may also be affected by this setting because ulimits are inherited on a process basis (i.e. from Passenger). There are two exceptions to this:

1. If you are using [passenger_load_shell_envvars](#passenger_load_shell_envvars) then the application processes are started through the shell, and the shell startup files may override the ulimits set by Passenger.

2. You can also set the file descriptor ulimit on a per-application basis (instead of setting it globally for the Passenger core process) using [passenger_app_file_descriptor_ulimit](#passenger_app_file_descriptor_ulimit).
`
			} />
		)
	}
}

export default NginxPerformanceTuning;
