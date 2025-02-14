import React, { Component } from 'react'
import './Navigation.css';
import Projects from './Projects';
import About from './About';
import Gallery from './Gallery';
import Home from './Home';
import BackToTop from './BackToTop';
import GuestBook from './GuestBook';
import RetrieveMovieInfo from './RetrieveMovieInfo';
import Movies from './Movies';
import images from './images.json';
import RetrieveMovieLists from './RetrieveMovieLists';

class Navigation extends Component {
    constructor(props) {
        super(props);
        console.log("===== NAVIGATION =====");
        console.log(props);
        this.state = {page: "home", component: undefined, disableScroll: false};
        this.changeTabs = this.changeTabs.bind(this);
        this.scrollFunction = this.scrollFunction.bind(this);
        this.disableScroll = this.disableScroll.bind(this);
        this.enableScroll = this.enableScroll.bind(this);
        window.addEventListener('scroll', this.scrollFunction);
        this.scrollPosition = 0;

        this.movieOptions = ['movies', 'add-movies', 'create-movies-list', 'graphviz'];

        this.moviesSet = RetrieveMovieInfo();
        this.movieListsSet = RetrieveMovieLists();
    }

    scrollFunction() {
        var mybutton = document.getElementById("back-to-top");
        // this.scrollPosition = document.documentElement.scrollTop;
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            mybutton.style.display = "block"
        }
        else
        {
            mybutton.style.display = "none";
        }
    }

    disableScroll() {
        console.log("disable scroll");
        this.scrollPosition = document.documentElement.scrollTop;
        const body = document.body;
        body.style.position = 'fixed';
        // body.style.top = scrollY;
        window.scrollTo(0, parseInt(this.scrollPosition));
    }

    enableScroll() {
        console.log("enable scroll");
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(this.scrollPosition));
    }

    changeTabs = (event) => {
        console.log(event.target.id);
        this.setState({page: event.target.id}, this._refresh);
    }

    _refresh = (props) => {
        if (props === undefined)
        {
            props = this.props;
        }
    }

    componentDidUpdate(prevProps) {
        // console.log(this.state);
    }

  render() {
      console.log("==== RENDER NAVIGATION ====");
      this.moviesSet = RetrieveMovieInfo();
      return ([
          <div className="navigation-container" key="TabList">
            <ul className="navigation">
              <li><a className={this.state.page === "home" ? "active-button" : "button" }
                     id="home"
                     onClick={this.changeTabs}
                     >Home</a></li>
              {/* Lionel Pix & Videos / Life Updates */}
              <li><a className={this.state.page === "gallery" ? "active-button" : "button" }
                     id="gallery"
                     onClick={this.changeTabs}
                     >Gallery</a></li>
              {/* SpeedChess, ThinkFast, Bankteller Screenshots/Boomberang Demos */}
              <li><a className={this.state.page === "projects" ? "active-button" : "button" }
                     id="projects"
                     onClick={this.changeTabs}
                     >Projects</a></li>
              {/* Assignmnent 5 */}
              <li><a className={this.state.page === "guest_book" ? "active-button" : "button" }
                     id="guest_book"
                     onClick={this.changeTabs}
                     >Guest Book</a></li>
             {/* Assignment 6 */}
             <li>
                <div className="dropdown">
                    <a className={(this.movieOptions.includes(this.state.page)) ? "active-button" : "button" }
                        id="movies"
                        onClick={this.changeTabs}
                        >Movies</a>
                    <div className="dropdown-content">
                        <a className={this.state.page === "add-movies" ? "active-button" : "sub-button" }
                           id="add-movies"
                           onClick={this.changeTabs}
                           >Add Movies</a>
                        <a className={this.state.page === "create-movies-list" ? "active-button" : "sub-button" }
                           id="create-movies-list"
                           onClick={this.changeTabs}
                           >New Movie Lists</a>
                        <a className={this.state.page === "graphviz" ? "active-button" : "sub-button" }
                           id="graphviz"
                           onClick={this.changeTabs}
                           >GraphViz</a>
                    </div>
                </div></li>
              {/* Intro, hobbies, next steps ==> Pic */}
             <li><a className={this.state.page === "about" ? "active-button" : "button" }
                    id="about"
                    onClick={this.changeTabs}
                    >About</a></li>
             <li><a className={this.state.page === "github" ? "active-button" : "button" }
                    id="github"
                    href="https://github.com/anniiebaii/portfolio">Github</a></li>
            </ul>
            <hr></hr>
          </div>,
          <div className="page-container" key="Body">
            {<BackToTop/>}
            {this.state.page === "gallery" ? <Gallery
                                                source={images}
                                                local={true}
                                                moda={undefined}
                                                openModalCallback={this.disableScroll}
                                                closeModalCallback={this.enableScroll}
                                                header={<h2 className="subheader">Gallery</h2>}/> :
            (this.state.page === "about" ? <About/> :
            (this.state.page === "projects" ? <Projects/> :
            (this.state.page === "guest_book" ? <GuestBook/> :
            ((this.movieOptions.includes(this.state.page)) ?
                <Movies
                    source={this.moviesSet}
                    lists={this.movieListsSet}
                    page={this.state.page}
                    openModalCallback={this.disableScroll}
                    closeModalCallback={this.enableScroll}/> : <Home/>))))}
          </div>
      ])
  }
}

export default Navigation
