import React, { Component } from 'react'
import './Navigation.css';

type NavigationProps = {
    page: string;
};

type NavigationState= {
    page: string;
};

class Navigation extends React.Component<NavigationProps, NavigationState> {
    constructor(props: NavigationProps) {
        super(props);
        this.state = {page: "home"};
        this.changeTabs = this.changeTabs.bind(this);
    }

    changeTabs = (event : any) => {
        console.log(event.target.id);
        console.log(event.target);
        this.setState({page: event.target.id});
    }

    _refresh = (props?: NavigationProps) => {
        if (props == undefined)
        {
            props = this.props;
        }
    }

    componentDidUpdate() {
        this.render();
        console.log(this.state);
    }

  render() {
      return (
          <div className="navigation-container">
            <ul className="navigation">
              <li><a className={this.state.page === "home" ? "active-button" : "button" }
                     id="home"
                     onClick={this.changeTabs}>Home</a></li>
              {/* Lionel Pix & Videos / Life Updates */}
              <li><a className={this.state.page === "gallery" ? "active-button" : "button" }
                     id="gallery"
                     onClick={this.changeTabs}>Gallery</a></li>
              {/* SpeedChess, ThinkFast, Bankteller Screenshots/Boomberang Demos */}
              <li><a className={this.state.page === "projects" ? "active-button" : "button" }
                     id="projects"
                     onClick={this.changeTabs}>Projects</a></li>
              {/* Intro, hobbies, next steps ==> Pic */}
              <li><a className={this.state.page === "about" ? "active-button" : "button" }
                     id="about"
                     onClick={this.changeTabs}>About</a></li>
              <li><a className={this.state.page === "github" ? "active-button" : "button" }
                     id="github"
                     href="https://github.com/anniiebaii/portfolio">Github</a></li>
            </ul>
            <hr></hr>
          </div>
      )
  }
}

export default Navigation
