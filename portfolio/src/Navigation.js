import React, { Component } from 'react'
import './Navigation.css';
import Projects from './Projects';
import About from './About';
import Gallery from './Gallery';
import Home from './Home';
import BackToTop from './BackToTop';
import GuestBook from './GuestBook';
import retrieveMovieInfo from './Movies';


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

var movies_list = retrieveMovieInfo();

class Navigation extends Component<NavigationProps, NavigationState> {
    constructor(props: NavigationProps) {
        super(props);
        console.log("contruct");
        this.state = {page: "home", component: undefined, disableScroll: false};
        this.changeTabs = this.changeTabs.bind(this);
        this.scrollFunction = this.scrollFunction.bind(this);
        this.disableScroll = this.disableScroll.bind(this);
        this.enableScroll = this.enableScroll.bind(this);
        window.addEventListener('scroll', this.scrollFunction);
        this.scrollPosition = 0;
    }

    scrollFunction() {
        var mybutton = document.getElementById("back-to-top");
        // this.scrollPosition = document.documentElement.scrollTop;
        // console.log(this.scrollPosition);
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            mybutton.style.display = "block"
        }
        else
        {
            mybutton.style.display = "none";
        }
    }

    disableScroll() {
        console.log("disable");
        this.scrollPosition = document.documentElement.scrollTop;
        console.log(this.scrollPosition);

        const body = document.body;
        body.style.position = 'fixed';
        // body.style.top = scrollY;
        window.scrollTo(0, parseInt(this.scrollPosition));
    }

    enableScroll() {
        console.log("enable");
        console.log(this.scrollPosition);

        const body = document.body;
      const scrollY = body.style.top;
      body.style.position = '';
      body.style.top = '';
      window.scrollTo(0, parseInt(this.scrollPosition));

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
        console.log(this.state);
    }

  render() {
      console.log("NAv render")
      return ([
          <div className="navigation-container" key="TabList">
            <ul className="navigation">
              <li><a className={this.state.page === "home" ? "active-button" : "button" }
                     id="home"
                     onClick={this.changeTabs}
                     href="#">Home</a></li>
              {/* Lionel Pix & Videos / Life Updates */}
              <li><a className={this.state.page === "gallery" ? "active-button" : "button" }
                     id="gallery"
                     onClick={this.changeTabs}
                     href="#">Gallery</a></li>
              {/* SpeedChess, ThinkFast, Bankteller Screenshots/Boomberang Demos */}
              <li><a className={this.state.page === "projects" ? "active-button" : "button" }
                     id="projects"
                     onClick={this.changeTabs}
                     href="#">Projects</a></li>
              {/* Assignmnent 5 */}
              <li><a className={this.state.page === "guest_book" ? "active-button" : "button" }
                     id="guest_book"
                     onClick={this.changeTabs}
                     href="#">Guest Book</a></li>
             {/* Assignment 6 */}
             <li>
                <div className="dropdown">
                    <a className={this.state.page === "movies" ? "active-button" : "button" }
                        id="movies"
                        onClick={this.changeTabs}
                        href="#">Movies</a>
                    <div class="dropdown-content">
                        <a className="add">Add Movie</a>
                        <a className="delete">Delete Movie</a>
                    </div>
                </div></li>
              {/* Intro, hobbies, next steps ==> Pic */}
             <li><a className={this.state.page === "about" ? "active-button" : "button" }
                    id="about"
                    onClick={this.changeTabs}
                    href="#">About</a></li>
             <li><a className={this.state.page === "github" ? "active-button" : "button" }
                    id="github"
                    href="https://github.com/anniiebaii/portfolio">Github</a></li>
            </ul>
            <hr></hr>
          </div>,
          <div className="page-container" key="Body">
            {<BackToTop/>}
            {this.state.page === "gallery" ? <Gallery source={images} local={true} openModalCallback={this.disableScroll} closeModalCallback={this.enableScroll}/> :
            (this.state.page === "about" ? <About/> :
            (this.state.page === "projects" ? <Projects/> :
            (this.state.page === "guest_book" ? <GuestBook/> :
            (this.state.page === "movies" ? <Gallery source={movies_list} local={false} openModalCallback={this.disableScroll} closeModalCallback={this.enableScroll}/> : <Home/>))))}
          </div>
      ])
  }
}

export default Navigation
