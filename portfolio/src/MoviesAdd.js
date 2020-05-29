// 1.1 Add new movie
// New page
// Input: IMDBbID
// Action: Add indicated movie into firebase
    // Make sure there's no duplicates

import React, {Component} from 'react';
import './Movies.css';
import config from './config.js'

const axios = require('axios');

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
        var imdb = this.state.imdb;

        if (this.state.imdb === "")
        {
            alert("IMDBbID cannot be empty!");
        }
        else
        {
            if (!firebase.apps.length) {
               firebase.initializeApp(config)
            }

            // Send Data to Firebase
            //
            axios.get('https://www.omdbapi.com/?apikey=d7201b9b&i=' + imdb)
              .then(function (response) {
                // handle success
                // console.log(response);
                var item = {};
                item["id"] = imdb;
                item["filename"] = response.data.Poster;
                item["caption"] = response.data.Title + " | Director(s): " + response.data.Director + " | IMDB Rating: " + response.data.imdbRating;
                // var test = {name:"Ying", message: "yur", anon: false}
                var jsonBody = JSON.stringify(item);
                // Send Data to Firebase
                firebase.database().ref('Movies/' + item["id"]).set(jsonBody);
                alert("Submission Sucessful");

                this.setState({IMDBbID: ""});
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })
              .then(function () {
                // always executed
              });

            // this.props.callBack();

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
