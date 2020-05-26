import React, {Component} from 'react'
import Gallery from './Gallery';
import movies from './movie_list.json';
import './Movies.css';

// Controller for Movies tab
    // Handles switching of panes
class Movies extends Component
{
    constructor(props)
    {
        super(props);
        console.log(props);

        this.state = {page: this.props.state}
        this.changeTabs = this.changeTabs.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.addToList = this.addToList.bind(this);

    }
    // @TODO add dropdown to select movie list to display (default: "All")
    // @TODO add search bar
    // Pagination

    changeTabs = (event : any) => {
        console.log(event.target.id);
        console.log(event.target);

        this.setState({page: event.target.id}, this._refresh);
    }

    deleteMovie = (event : any) => {

    }

    addToList = (event : any) => {

    }

    render()
    {
        return ([
            this.props.page === "movies" ?
                <Gallery
                    source={this.props.source}
                    local={false}
                    openModalCallback={this.props.openModalCallback}
                    closeModalCallback={this.props.closeModalCallback}
                    modalButtons={
                        <div className="modal-options">
                            <a className="modal-button"
                                id="add-to-list"
                                onClick={this.addToList}
                                href="#">Add to List</a>
                            <a className="modal-button"
                                id="delete"
                                onClick={this.deleteMovie}
                                href="#">Delete</a>
                        </div>
                    }
                    header={
                        <div className="page-header">
                            <h2 className="subheader"
                                style={{display: "inline-block"}}>Movies</h2>
                            <div className="dropdown">
                                <a className="sub-button"
                                    id="movies"
                                    onClick={this.changeTabs}
                                    href="#">Movies</a>
                                <div className="dropdown-content">
                                    <a className="sub-button"
                                       id="add-movies"
                                       onClick={this.changeTabs}
                                       href="#add-movie">Add Movie</a>
                                    <a className="sub-button"
                                       id="delete-movies"
                                       onClick={this.changeTabs}
                                       href="#delete-movie">Delete Movie</a>
                                </div>
                            </div>
                        </div>}/>
            : (this.props.page === "add-movies" ? <div>add movies</div> : <div> WIP </div>)        ])
    }

}


export default Movies;
