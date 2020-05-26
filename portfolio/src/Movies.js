import React, {Component} from 'react'
import Gallery from './Gallery';
import movies from './movie_list.json';

// Controller for Movies tab
    // Handles switching of panes
class Movies extends Component
{
    constructor(props)
    {
        super(props);
        console.log(props);
    }
    // @TODO add dropdown to select movie list to display (default: "All")
    // @TODO add search bar
    // Pagination

    render()
    {
        return ([
            this.props.state === "movies" ?
                <Gallery
                    source={this.props.source}
                    local={false}
                    openModalCallback={this.props.openModalCallback}
                    closeModalCallback={this.props.closeModalCallback}
                    header={
                        <div className="page-header">
                            <h2 className="subheader" style={{display: "inline-block"}}>Movies</h2>
                            <div className="dropdown">
                                <a className="button"
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
            : <div> WIP </div>        ])
    }

}


export default Movies;
