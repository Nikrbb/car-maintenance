import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
// import Model from './model';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.Context value={new Model()}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    // </React.Context>
);
