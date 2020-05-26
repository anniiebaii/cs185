// 1.1 Add new movie
// New page
// Input: IMDBbID
// Action: Add indicated movie into firebase
    // Make sure there's no duplicates

import React, {Component} from 'react';
import './Movies.css';
import config from './config.js'

class MoviesAdd extends Component
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
        var val = field === "anon" ? event.target.checked : event.target.value;

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
            alert("IMDBbID cannot be empty!");
        }
        else
        {
            if (!firebase.apps.length) {
               firebase.initializeApp(config)
            }

            // var test = {name:"Ying", message: "yur", anon: false}
            // var jsonBody = JSON.stringify(this.state);
            // // Send Data to Firebase
            // firebase.database().ref('GuestBook').push().set(jsonBody)
            // this.props.callBack();
            // alert("Submission Sucessful");

            this.setState({IMDBbID: ""});
        }

    }

    componentDidUpdate()
    {
        console.log(this.state);
    }

    render()
    {
        return (
            <form className="add-movie-form" onSubmit={this.handleSubmit}>
                <label key="name">
                    IMDBbID:
                    <input id="imdb"
                           type="text"
                           style={{width: "99%"}}
                           value={this.state.imdb}
                           onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }

}
export default MoviesAdd;
