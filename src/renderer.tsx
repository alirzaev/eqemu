import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Eqemu } from './components/Eqemu';
import { store } from './store';
import { loadSettings } from './store/slices/settings';

import './index.css';

function main() {
    Promise.all([electron.system.getInfo(), store.dispatch(loadSettings())]).then(([info]) => {
        ReactDOM.render(
            <Provider store={store}>
                <Eqemu systemInfo={info} />
            </Provider>,
            document.querySelector('#eqemu')
        );
    });
}

main();
