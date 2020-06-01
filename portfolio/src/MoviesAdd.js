// 1.1 Add new movie
// New page
// Input: IMDBbID
// Action: Add indicated movie into firebase
    // Make sure there's no duplicates

import React, {Component} from 'react';
import './Movies.css';
import config from './config.js'

const axios = require('axios');
const firebase = require('firebase');

class MoviesAdd extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {imdb: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.exists = this.exists.bind(this);

    }

    _refresh()
    {

    }

    exists(imdb)
    {
        var exists = false;
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }

        var ref = firebase.database().ref('Movies/' + imdb).once("value", snapshot => {
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

    handleSubmit = (event) => {
        event.preventDefault();

        var imdb = this.state.imdb;
        var success = false;

        console.log(this.exists(imdb));

        if (this.state.imdb === "")
        {
            alert("IMDbID cannot be empty!");
        }
        else if (this.exists(imdb) === true)
        {
            alert("A Movie with this IMDBbID already exists!");
        }
        else
        {
            if (!firebase.apps.length) {
               firebase.initializeApp(config)
            }

            // Ping axios API for info
            axios.get('https://www.omdbapi.com/?apikey=d7201b9b&i=' + imdb)
              .then(function (response) {
                  console.log(response);
                  if (response.data.Response === "False")
                  {
                      alert(response.data.Error);
                      return;
                  }
                // handle success
                var item = {};
                item["id"] = imdb;
                item["title"] = response.data.Title;
                item["filename"] = response.data.Poster;
                item["caption"] = response.data.Title + " | Director(s): " + response.data.Director + " | IMDB Rating: " + response.data.imdbRating;
                var jsonBody = JSON.stringify(item);
                // Send Data to Firebase
                firebase.database().ref('Movies/' + item["id"]).set(jsonBody, function(res) {
                    if (res)
                    {
                        alert(res);
                    }
                    else
                    {
                        alert("Submission Sucessful");
                    }
                });

              })
              .catch(function (error) {
                // handle error
                console.log(error);
                alert("Invalid");
              })
              .then(function () {
                // always executed
              });

            // this.props.callBack();
            this.setState({imdb: ""});
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
                    IMDbID:
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
