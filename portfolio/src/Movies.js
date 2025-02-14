import React, {Component} from 'react'
import Gallery from './Gallery';
import MoviesAdd from './MoviesAdd';
import MoviesList from './MoviesLists';
import MoviesSearch from './MoviesSearch';
import RetrieveMovieInfo from './RetrieveMovieInfo';
import movies from './movie_list.json';
import config from './config.js';
import './Movies.css';
import RetrieveMovieLists from './RetrieveMovieLists';
import GraphViz from './GraphViz';

// Controller for Movies tab
    // Handles switching of panes
class Movies extends Component
{
    constructor(props)
    {
        super(props);
        console.log("===== MOVIES ======");
        console.log(props);

        this.state = {page: this.props.state, list: "All", selected: null, content: this.props.source, lists: this.props.lists};
        
        this.deleteMovie = this.deleteMovie.bind(this);
        this.addMovieToList = this.addMovieToList.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
        
        this.getLists = this.getLists.bind(this);

        this.select = this.select.bind(this);
        this.deselect = this.deselect.bind(this);

        this.selected = null;

        this.handleSearch = this.handleSearch.bind(this);
        this.allMovies = this.props.source;
    }

    _refresh()
    {
        this.render();
    }
    // @TODO Display movies in selected list
    // @TODO Pagination

    componentDidUpdate(prevProps)
    {
        this.allMovies = RetrieveMovieInfo();
        this.render();
    }

    deleteMovie = (event) => {
        if (this.state.selected === null)
        {
            alert("Error deleting..");
            return;
        }
        console.log("deleting..." + this.state.selected);
        const firebase = require('firebase');

        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }

        // Get Reference to Data in Firebase
        var movieRef = firebase.database().ref('Movies/' + this.state.selected);
        movieRef.remove();
        alert("Delete Sucessful");

        var content = this.state.content;
        var code = this.state.selected;
        delete content[code];

        if (this.state.list !== "All")
        {
            var listRef = firebase.database().ref('MovieLists/' + this.state.list);
            listRef.set("");
    
            for (const property in content)
            {
                listRef.push().set(property);
            }
        }
        
        var stateObject = function() {
            var returnObj = {};
            returnObj["selected"] = null;
            returnObj["content"] = content;
            returnObj["lists"] = RetrieveMovieLists();
               return returnObj;
          }();

        this.allMovies = RetrieveMovieInfo();
  
        this.setState( stateObject, this.render);
    }

    addMovieToList = (event) => {
        if (this.state.selected === null)
        {
            alert("Error adding to list..");
            return;
        }
        console.log("adding..." + this.state.selected);
        const firebase = require('firebase');

        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }

        // Get Reference to Data in Firebase
        var movieRef = firebase.database().ref('MovieLists/' + event.target.id).push().set(this.state.selected);

        alert("TODO: Added to " + event.target.id);
        this.setState({selected: null});
    }

    handleListChange = (event) => {
        event.preventDefault();
        console.log("HANDLING list chnage");
        var content = {};
        let list_val = event.target.id;

        var stateObject = function() {
          var returnObj = {};
          console.log("list = " + list_val);
          returnObj["list"] = list_val;
          returnObj["lists"] = RetrieveMovieLists();
             return returnObj;
        }();

        var lists = stateObject["lists"];
        var movies = lists[list_val];
        if (movies != undefined)
        {
            movies.forEach((item) => 
            {
                if (this.allMovies[item] !== undefined)
                {
                    content[item] = this.allMovies[item];
                }
            });
        }
        if (list_val === "All")
        {
            content = this.allMovies;
        }
        
        stateObject["content"] = content;
        this.setState( stateObject);
    }

    getLists(handler)
    {
        var curr_list = this.state.list;
        var allLists = [];
        var lists = RetrieveMovieLists();

        for (const property in lists) 
        {
            var list_name = property;
            var movies = lists[list_name];

            // console.log(`${list_name}: ${movies}`);
            
            if (curr_list !== list_name)
            {
                allLists.push(
                    <a className="sub-button"
                    id={list_name}
                    onClick={handler}
                    >{list_name}</a>);
            }
        }

        if (curr_list !== "All" && handler != this.addMovieToList)
            {
                allLists.push(
                    <a className="sub-button"
                    id="All"
                    onClick={handler}
                    >All</a>);
            }
       
        return allLists;
    }

    select(movie){
        this.setState({selected: movie.id});
    }

    deselect() {
        this.setState({selected: null});
    }

    handleSearch(movieSet) {
        // trigger display change
        console.log("handleSearch");
        if (movieSet === false)
        {
            movieSet = {};
            let list = this.state.list;
            var lists = this.state.lists;
            var movies = lists[list];
            if (movies != undefined)
            {
                movies.forEach((item) => 
                {
                    if (this.allMovies[item] !== undefined)
                    {
                        movieSet[item] = this.allMovies[item];
                    }
                });
            }
            if (list === "All")
            {
                movieSet = this.allMovies;
            }
        }
        this.setState({content: movieSet});
    }

    sanitizeContent(content)
    {
        var newKeys = [];
        var sanitizeContent = [];
        for (const property in content) 
        {
            var data = content[property];
            if (!newKeys.includes(data.id))
            {
                    newKeys.push(data.id);
                    sanitizeContent.push(data);
            }
        }
    
        return sanitizeContent;

    }

    render()
    {
        console.log("===== RENDER MOVIES ======");
        this.addToLists =  this.getLists(this.addMovieToList);
        this.selectedLists = this.getLists(this.handleListChange);

        console.log(Object.values(this.state.content));
        console.log(this.selectedLists);

        // Clean up in case of duplicates...

        return ([
            this.props.page === "movies" ?
                <Gallery
                    source={this.sanitizeContent(Object.values(this.state.content))}
                    lists={this.state.content}
                    local={false}
                    modal={undefined}
                    openModalCallback={this.props.openModalCallback}
                    openModalUpdate={this.select}
                    closeModalCallback={this.props.closeModalCallback}
                    closeModalUpdate={this.deselect}
                    modalButtons={
                        <div className="modal-options">
                            <div className="dropdown">
                                <a className="modal-button"
                                    id="add-to-list"
                                    >Add to List</a>
                                <div className="dropdown-content">
                                    {this.addToLists}
                                </div>
                            </div>
                            <a className="modal-button"
                                id="delete"
                                onClick={this.deleteMovie}
                                >Delete</a>
                        </div>
                    }
                    header={
                        <div className="page-header">
                            <div className="dropdown" style={{width: "auto", backgroundColor: "#d3d3d3", margin: "15px"}}>
                                <a className="button"
                                    id={this.state.list}
                                    onClick={this.handleListChange}
                                    >{this.state.list}</a>
                                <div className="dropdown-content">
                                    {this.selectedLists}
                                </div>
                            </div>
                            <MoviesSearch source={this.state.content} callBack={this.handleSearch}/>
                        </div>}/> :
            (this.props.page === "add-movies" ?
                <MoviesAdd/> : 
            (this.props.page === "graphviz" ? 
                <GraphViz movies={this.allMovies} list={this.state.lists["GraphViz"]}  /> :
                <MoviesList/>))        ])
    }

}


export default Movies;
