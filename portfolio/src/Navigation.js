import React from 'react';
import './Navigation.css';

function Navigation() {
  return (
      <div className="navigation-container">
        <ul className="navigation">
          <li><a className="active-button" id="home" href="index.html">Home</a></li>
          {/* Lionel Pix & Videos / Life Updates */}
          <li><a className="button" id="gallery" href="gallery.html">Gallery</a></li>
          {/* SpeedChess, ThinkFast, Bankteller Screenshots/Boomberang Demos */}
          <li><a className="button" id="projects" href="projects.html">Projects</a></li>
          {/* Intro, hobbies, next steps ==> Pic */}
          <li><a className="button" id="about" href="about.html">About</a></li>
          <li><a className="button" id="github" href="https://github.com/anniiebaii/portfolio">Github</a></li>
        </ul>
        <hr></hr>
      </div>
  );
}

export default Navigation;
