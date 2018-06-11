import React, { Component } from 'react';
import Markdown from 'react-markdown';

class SharedReloadingCode extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
When developing a web application, you will often want your code changes to take effect as soon as possible. In this section we will discuss code reloading mechanisms that Passenger makes available, and how they compare to code reloading mechanisms provided by ${this.props.currentLanguage} web frameworks.

Some frameworks provide built-in code reloading mechanisms. They usually work by polling files changes and re-evaluating those files. Such mechanisms are much faster than restarting the server. Restarting the server may take a few seconds, but builtin reloading take a few miliseconds. But they have a drawback too: not all code can be reloaded, especially initialization-related code.

Most frameworks do not provide a code reloading mechanism at all, requiring you to restart the server after every code change. Needless to say, performing a restart after every change is cumbersome.

Passenger provides a number of restarting mechanisms to make life easier for you, in case the builtin web framework code reloading isn't good enough for you (if it exists at all).

## passenger-config restart-app

You can use the \`passenger-config restart-app\` command to restart an application that is being served by Passenger. This is more convenient than stopping and starting Passenger, which requires two commands.

### Default invocation

If you invoke \`passenger-config restart-app\` without arguments, it will ask you which application you want to restart. Here is an example:

<pre class="highlight">
<span><span class="prompt">$</span> passenger-config restart-app</span>
<span class="output">Please select the application to restart.
Tip: re-run this command with --help to learn how to automate it.
If the menu doesn't display correctly, press '!'

 ‣   /Users/phusion/testapp/public (development)
     Cancel</span></pre>

Use the Up and Down arrow keys to navigate the menu. Press Enter and it will restart the selected application.

<div class="info">
  The reason why it asks you is because Passenger is designed to be able to handle multiple apps in the same Passenger instances, although in this tutorial you will only be using Passenger to serve a single app.
</div>

### Non-interactive invocation

You can also tell \`passenger-config restart-app\` to restart a specific application instead of asking you with a menu. The command accepts an application path prefix as first argument. When given, it will restart all applications whose path matches the given prefix.

For example, suppose that your application is located in \`/Users/phusion/testapp\`. You have tell Passenger to restart the application like this:

<pre class="highlight">
<span><span class="prompt">$</span> passenger-config restart-app /Users/phusion/testapp</span>
<span class="output">Restarting /Users/phusion/testapp/public (development)</span></pre>

There is an even shorter way. You can tell Passenger to restart all apps that it is currently serving, by specifying \`/\` as the argument. This is because all applications' paths start with \`/\`.

<span><span class="prompt">$</span> passenger-config restart-app /Users/phusion/testapp</span>
<span class="output">Restarting /Users/phusion/testapp/public (development)</span></pre>

### Invoking the command quickly

The text \`passenger-config restart-app /\` is pretty long to type. But luckily you do not have to type the command over and over.

If you are using the Bash shell, then you can use \`Ctrl-R\` to lookup a command in your history. In an empty Bash shell prompt, press \`Ctrl-R\` to activate the history lookup mechanism:

<pre class="highlight"><span class="prompt">$</span>
<span class="c">(press Ctrl-R now)</span>
<span class="prompt">(reverse-i-search)\`':</span></pre>

If you type anything in this prompt, Bash will perform a substring search in its history and show you the first result. For example, type \`restart-app\` and you should see this:

<pre class="highlight"><span class="prompt">(reverse-i-search)\`restart-app': </span>passenger-config restart-app /</pre>

If you press Enter, Bash will execute the looked up command.


## tmp/always_restart.txt

Passenger also supports the magic file 'tmp/always_restart.txt'. If this file exists, Passenger will restart your application after every request. This way you do not have to invoke the restart command often.

Activate this mechanism by creating the file:

<pre class="highlight"><span class="prompt">$ </span>mkdir -p tmp
<span class="prompt">$ </span>touch tmp/always_restart.txt</pre>

Deactivate this mechanism by removing the file:

<pre class="highlight"><span class="prompt">$ </span>rm tmp/always_restart.txt</pre>

## Conclusion

Congratulations, you have almost reached the conclusion of this basics tutorial. Next, we will teach you how to get help in case you need it.
`
			} />
		)
	}
}

export default SharedReloadingCode;
