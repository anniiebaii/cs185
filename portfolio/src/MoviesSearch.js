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

        const firebase = require('firebase');
        var imdb = this.state.imdb;
        var success = false;

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
                  console.log(response);
                  if (response.data.Response === "False")
                  {
                      alert(response.data.Error);
                      return;
                  }
                // handle success
                // console.log(response);
                var item = {};
                item["id"] = imdb;
                item["filename"] = response.data.Poster;
                item["caption"] = response.data.Title + " | Director(s): " + response.data.Director + " | IMDB Rating: " + response.data.imdbRating;
                // var test = {name:"Ying", message: "yur", anon: false}
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
            <div className="search-container">
                <form className="search-bar">
                    <input type="text" placeholder="Search.." name="search" onChange={this.handleChange}></input>
                    <input type="submit" value="Go"/>
                </form>
            </div>
        )
    }

}
export default MoviesSearch;
