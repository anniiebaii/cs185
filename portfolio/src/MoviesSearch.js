import React, {Component} from 'react';
import './Movies.css';
import config from './config.js'

const axios = require('axios');

class MoviesSearch extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {keyword: ""};
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
        event.preventDefault();
        console.log(this.state.keyword);
        var movieSet = [];
        this.props.source.forEach((item) =>
            {
                var title = item.title.toLowerCase();
                if (title.includes(this.state.keyword.toLowerCase()))
                {
                    console.log(title);
                    movieSet.push(item);
                }
            }

        );
        console.log(movieSet);
        this.props.callBack(movieSet);

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
                    <input id="keyword" type="text" placeholder="Search.." onChange={this.handleChange}></input>
                    <input type="submit" value="Go"/>
                </form>
            </div>
        )
    }

}
export default MoviesSearch;
