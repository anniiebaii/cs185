import React, {Component} from 'react';
import './Movies.css';
import config from './config.js'

const axios = require('axios');

class MoviesSearch extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {imdb: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    _refresh()
    {

    }

    handleChange = (event) => {
        const field = event.target.id;
        var val = event.target.value;

        var stateObject = function() {
          var returnObj = {};
          console.log(field + " = " + val);
          returnObj[field] = val;
             return returnObj;
        }();

        this.setState( stateObject);
    }

    // @TODO check for char limits..
    handleSubmit = (event) => {
        // return set of movies with searched keyword
    }

    componentDidUpdate()
    {
        console.log(this.state);
        this.render();
    }

    render()
    {
        return (
            <div className="search-container">
                <form className="search-bar" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Search.." name="search" onChange={this.handleChange}></input>
                    <input type="submit" value="Go"/>
                </form>
            </div>
        )
    }

}
export default MoviesSearch;
