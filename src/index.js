import React from 'react';
import {BrowserRouter} from "react-router-dom";
import store from '../src/App/Store/store';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
