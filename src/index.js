import React from 'react';
import ReactDOM from 'react-dom';

import './css/normalize.css';
import './css/global.css';
import Test from './components/Test';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Test />, document.getElementById('root'));
registerServiceWorker();
