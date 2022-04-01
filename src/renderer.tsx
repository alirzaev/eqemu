import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Eqemu } from './components/Eqemu';
import { store } from './store';

import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <Eqemu />
    </Provider>,
    document.querySelector('#eqemu')
);
