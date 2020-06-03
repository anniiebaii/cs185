// 1.4 Create new list
// Input: Title of list
// Default List: "All"
// Default Lists: "Watched", "WannaWatch"

import React, {Component} from 'react';
import './Movies.css';
import config from './config.js'

const firebase = require('firebase');

class MoviesList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {list_name: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.exists = this.exists.bind(this);

    }

    _refresh()
    {

    }

    exists(list_name)
    {
        var exists = false;
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }

        var ref = firebase.database().ref('MovieLists/' + list_name).once("value", snapshot => {
            if (snapshot.exists()){
                console.log("exists!");
                exists = true;
            }
        });

        return exists;
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
        event.preventDefault();

        if (this.state.list_name === "")
        {
            alert("Movie List's Name cannot be empty!");
        }
        else if (this.exists(this.state.list_name) || this.state.list_name === "All")
        {
            alert("A Movie List with this name already exists!");
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
