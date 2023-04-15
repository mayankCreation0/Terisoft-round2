import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import  ContextApi  from "./ContextApi/ContextApi";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextApi>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ContextApi>
);
reportWebVitals();
