import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import App from './App';
import Navigation from './Navigation';
import Projects from './Projects';
import About from './About';
import Gallery from './Gallery';



import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Navigation />
    <Gallery />
  </React.StrictMode>,
  document.getElementById('root') // render App to the root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
