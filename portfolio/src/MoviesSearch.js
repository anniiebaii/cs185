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
        if (this.state.keyword === "")
        {
            this.props.callBack(false);
            return;
        }
        var movieSet = [];
        for (const property in this.props.source)
        {
            var data = this.props.source[property];
            var title = data.title.toLowerCase();
            if (title.includes(this.state.keyword.toLowerCase()))
            {
                movieSet.push(data);
            }
        }
        this.props.callBack(movieSet);

    }

    componentDidUpdate()
    {
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
