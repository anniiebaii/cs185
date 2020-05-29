// 1.4 Create new list
// Input: Title of list
// Default List: "All"
// Default Lists: "Watched", "WannaWatch"

// 1.1 Add new movie
// New page
// Input: IMDBbID
// Action: Add indicated movie into firebase
    // Make sure there's no duplicates

import React, {Component} from 'react';
import './Movies.css';
import config from './config.js'

class MoviesList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {list_name: ""};
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

        const firebase = require('firebase');

        if (this.state.imdb === "")
        {
            alert("Movie List's Name cannot be empty!");
        }
        else
        {
            if (!firebase.apps.length) {
               firebase.initializeApp(config)
            }

            // var test = {name:"Ying", message: "yur", anon: false}
            var jsonBody = JSON.stringify(this.state);
            // Send Data to Firebase
            firebase.database().ref('MovieLists/' + this.state.list_name).set("");

            // this.props.callBack();
            alert("Submission Sucessful");

            this.setState({list_name: ""});
        }

    }

    componentDidUpdate()
    {
        console.log(this.state);
        this.render();
    }

    render()
    {
        return (
            <form className="add-movie-form" onSubmit={this.handleSubmit}>
                <label key="list_name">
                    Name:
                    <input id="list_name"
                           type="text"
                           style={{width: "99%"}}
                           value={this.state.list_name}
                           onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }

}
export default MoviesList;
