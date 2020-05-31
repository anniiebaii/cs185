import React, {Component} from 'react'
import Gallery from './Gallery';
import MoviesAdd from './MoviesAdd';
import MoviesList from './MoviesLists';
import MoviesSearch from './MoviesSearch';
import movies from './movie_list.json';
import config from './config.js';
import './Movies.css';

// Controller for Movies tab
    // Handles switching of panes
class Movies extends Component
{
    constructor(props)
    {
        super(props);
        console.log(props);

        this.state = {page: this.props.state, list: "All", selected: null, content: this.props.source}
        this.changeList = this.changeList.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
        this.getLists = this.getLists.bind(this);

        this.select = this.select.bind(this);
        this.deselect = this.deselect.bind(this);

        this.selected = null;

        this.handleSearch = this.handleSearch.bind(this);
    }

    _refresh()
    {
        this.render();
    }
    // @TODO add dropdown to select movie list to display (default: "All")
    // @TODO add search bar
    // Pagination

    changeList = (event : any) => {
        console.log(event.target.id);
        console.log(event.target);

        // this.setState({page: event.target.id}, this._refresh);
    }

    componentDidUpdate()
    {
        this.render();
    }

    deleteMovie = (event : any) => {
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
        this.setState({selected: null});
    }

    addToLists = (event : any) => {
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

        alert("Delete Sucessful");
        this.setState({selected: null});
        alert("STUB: Added to " + event.target.id);

    }

    handleListChange = (event : any) => {
        // alert("STUB: reloaded to display " + event.target.id);
        this.setState({content:[]});
    }

    getLists(type)
    {
        var lists = [];
        var onClick = this.handleListChange;
        if (type == "added")
        {
            onClick = this.addToLists;
        }

        const firebase = require('firebase');

        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }
        var movieListsRef = firebase.database().ref("MovieLists");
        console.log(movieListsRef);

        //retrieve its data
        movieListsRef.on('value', snapshot => {
             //this is your call back function
        		 //state will be a JSON object after this
             //set your apps state to contain this data however you like
             // const state = snapshot.val()
             snapshot.forEach(function (childSnapshot) {
                 lists.push(
                     <a className="sub-button"
                        id={childSnapshot.key}
                        onClick={onClick}
                        >{childSnapshot.key}</a>);
             });
        });
        return lists;
    }

    select(movie){
        console.log(movie);
        this.setState({selected: movie.id});
    }

    deselect() {
        this.setState({selected: null});
    }

    handleSearch(movieSet) {
        // trigger display change
        this.setState({content: movieSet});
    }

    render()
    {
        console.log("render");
        this.addToLists = this.getLists("added");
        this.selectedLists = this.getLists("selected");
        return ([
            this.props.page === "movies" ?
                <Gallery
                    source={this.state.content}
                    local={false}
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
                                    id="movies"
                                    >{this.state.list}</a>
                                <div className="dropdown-content">
                                    {this.selectedLists}
                                </div>
                            </div>
                            <MoviesSearch source={this.props.source} callBack={this.handleSearch}/>
                        </div>}/> :
            (this.props.page === "add-movies" ?
                <MoviesAdd/> :
                <MoviesList/>)        ])
    }

}


export default Movies;
