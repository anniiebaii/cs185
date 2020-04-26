import React, { Component } from 'react'
import './Navigation.css';

type NavigationProps = {
    page_name: string;
};

type NavigationState= {
    page_name: string;
};

class Navigation extends React.Component<NavigationProps, NavigationState> {
    constructor(props: NavigationProps) {
        super(props);
        // this.state = {page: this.props.match.params.page_name};
    }
  render() {

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
      )
  }
}

export default Navigation
