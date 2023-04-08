import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss'
import './styles/App.scss'
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import '../node_modules/jquery/dist/jquery.min'
import 'font-awesome/css/font-awesome.min.css';
import {
  BrowserRouter,
} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter  >
    <App />
  </BrowserRouter >
);