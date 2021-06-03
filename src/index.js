import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TimeAgo from 'javascript-time-ago'

import ko from 'javascript-time-ago/locale/ko'
import en from 'javascript-time-ago/locale/en'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

TimeAgo.addDefaultLocale(ko)
TimeAgo.addLocale(en)

ReactDOM.render(<App />, document.getElementById('root'));
