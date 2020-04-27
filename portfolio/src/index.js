import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css';
import App from './App';
import Navigation from './Navigation';

import * as serviceWorker from './serviceWorker';

const images = [
    {
        filename: 'appa01.jpg',
        caption: "Meet Appa, my German Shepherd puppy! He's named after the sky bison in Avatar the Last Air Bender. Appa is a stubborn puppy that won't let anything stop him from getting head scritches and naps on my lap."
    },
    {
        filename: 'appa02.jpg',
        caption: 'Appa'
    },
    {
        filename: 'appa03.jpg',
        caption: 'Appa getting the pets.'
    },
    {
        filename: 'ucsb01.jpg',
        caption: 'UCSB beaches are gorgeous.'
    },
    {
        filename: 'ucsb02.jpg',
        caption: 'UCSB Sunsets'
    }
]

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Navigation />
  </React.StrictMode>,
  document.getElementById('root') // render App to the root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
