import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App';
import './Styles/index.css'
import store from './Redux/store'

import { SnackbarProvider } from 'notistack';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SnackbarProvider
        maxSnack={3}
        autoHideDuration={1000}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
    >
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </SnackbarProvider>
);


