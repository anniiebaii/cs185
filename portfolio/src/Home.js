import React from 'react';
import './style.css';

function Home() {
  return (
      <div className="sub-page-container">
          <img className="resize" src={require("./images/bytes.png")} alt="Byte Joke"></img>
          <p className="text-body">Welcome! This site is a portfolio and created for the purpose of CMPSC185. This page is still under construction.</p>
      </div>


  );
}

export default Home;
