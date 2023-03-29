import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Model from './model';
import { contextRoot } from './context/contextRoot';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <contextRoot.Provider value={new Model()}>
        <App />
    </contextRoot.Provider>
);
