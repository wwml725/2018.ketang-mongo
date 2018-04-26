import React from 'react';
import {render} from 'react-dom';
import './common/index.less';
import App from "./App/index";

import {Provider} from 'react-redux';
import store from './redux/store';
window._store = store;

render(
    <Provider store={store}>
                <App/>
    </Provider>,
    document.getElementById('app'));




