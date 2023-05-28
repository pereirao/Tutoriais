import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/es';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import 'semantic-ui-css/semantic.css';
// import 'react-select/dist/react-select.css';
import Raven from 'raven-js';
import App from './App';
import {unregister} from './registerServiceWorker';
import {version} from '../package.json';
import './index.css';

Raven.config('https://838167877cc244d3822708f2549f7f3e@sentry.io/242766').install();
Raven.setTagsContext({environment: process.env.NODE_ENV});
Raven.setExtraContext({app_version: version});

ReactDOM.render(<App/>, document.getElementById('root'));

// registerServiceWorker(); // this makes caching and updating hard
unregister(); //  this unregisters any original service workers
