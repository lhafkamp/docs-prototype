import React, { Component } from 'react';
import Markdown from 'react-markdown';

class PythonQuickstart extends Component {
	render() {
		return (
			<Markdown escapeHtml={false} source={
`
## Preparing the example application

In this tutorial we will use [an example "hello world" application](https://github.com/phusion/passenger-python-flask-demo), written in [Flask](http://flask.pocoo.org/):

    git clone https://github.com/phusion/passenger-python-flask-demo.git
    cd passenger-python-flask-demo

## Adding a WSGI file

### What is WSGI?

Many Python web frameworks have a builtin web server that is activated by running the app. For example, you normally run a Flask app with the builtin Flask web server like this:

~~~bash
python app.py
~~~

Passenger doesn't work like that. It works with [the Python WSGI standard](http://wsgi.readthedocs.org/en/latest/). WSGI defines a standard interface for web applications, allowing any web application that implements WSGI to work with any server that supports WSGI. Pretty much any modern Python web framework implements WSGI. This includes Django, Flask and more.

### The Passenger WSGI file

Create a WSGI file in the app's directory. Passenger expects it be called \`passenger_wsgi.py\`. The contents depends on the application and the web framework, but for our Flask example app, this is what you need to put in the file:

~~~python
# passenger_wsgi.py
from app import MyApp as application
~~~

<div class="info">
  <h3 class="notoc">What just happened?</h3>
  <p>WSGI works by defining a callable object called <code>application</code> inside the WSGI file. This callable expects a request object, which the WSGI server provides; and returns a response object, which the WSGI server serializes and sends to the client.</p>
  <p>Flask's application object, created by a <code>MyApp = Flask(__name__)</code> call, is a valid WSGI callable object. So our WSGI file is as simple as importing the Flask application object (<code>MyApp</code>) from <code>app.py</code>, and calling it <code>application</code>.</p>
  <p>Other Python web frameworks require different code, but work with similar principles.</p>
</div>

## Running the server

You can now run your app with \`passenger start\`:

~~~bash
passenger start
# => ======= Phusion Passenger Standalone web server started =======
# => PID file: /Users/phusion/myapp/passenger.3000.pid
# => Log file: /Users/phusion/myapp/passenger.3000.log
# => Environment: development
# => Accessible via: http://0.0.0.0:3000/
# =>
# => You can stop Phusion Passenger Standalone by pressing Ctrl-C.
# => ===============================================================
~~~

As you can see in the output, Passenger is now serving your app on [http://0.0.0.0:3000/](http://0.0.0.0:3000/). So if you go to that URL, you will should see your application:

~~~bash
curl http://0.0.0.0:3000/
# => your app's front page HTML
~~~

## Stopping the server

There are two ways to stop the server. The first is by pressing Ctrl-C in the terminal.

~~~bash
passenger start
# => ...
# => (press Ctrl-C here)
# => Stopping web server... done!
~~~

The second way is by starting a seperate terminal, changing the working directory to your application, and running \`passenger stop\`:

~~~bash
cd /path-to-your-app
passenger stop
~~~

## Conclusion

Congratulations! You've passed this tutorial and seen Passenger in action. You can find the end result of this tutorial in [the example application's git repository's \`end_result\` branch](https://github.com/phusion/passenger-python-flask-demo/tree/end_result).

You may now be interested in intermediate-level tutorial.
`
			} />
		)
	}
}

export default PythonQuickstart;
