import React, { Component } from 'react'
import './Navigation.css';
import Projects from './Projects';
import About from './About';
import Gallery from './Gallery';
import Home from './Home';


type NavigationProps = {
    page: string;
};

type NavigationState= {
    page: string;
};

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

class Navigation extends React.Component<NavigationProps, NavigationState> {
    constructor(props: NavigationProps) {
        super(props);
        this.state = {page: "home", component: undefined};
        this.changeTabs = this.changeTabs.bind(this);
    }

    changeTabs = (event : any) => {
        console.log(event.target.id);
        console.log(event.target);

        this.setState({page: event.target.id}, this._refresh);
    }

    _refresh = (props?: NavigationProps) => {
        if (props === undefined)
        {
            props = this.props;
        }
        console.log(this.state);
    }

    componentDidUpdate() {
        this.render(<Gallery source={images}/>);
        console.log(this.state);
    }

  render(component) {
      console.log(component);
      return ([
          <div className="navigation-container" key="TabList">
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
          </div>,
          <div className="page-container" key="Body">
            {this.state.page === "gallery" ? <Gallery source={images}/> :
            (this.state.page === "about" ? <About/> :
            (this.state.page === "projects" ? <Projects/> : <Home/>))}
          </div>
      ])
  }
}

export default Navigation
