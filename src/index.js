import React from 'react';
import ReactDOM from 'react-dom';
// import {BrowserRouter} from 'react-router-dom';
import './index.css';
// import DB from './db';
import Index from './components/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Index />, document.getElementById('root'));
registerServiceWorker();
