import React, {Component} from 'react'
import Gallery from './Gallery';
import movies from './movie_list.json';
import config from './config.js';


// http://www.omdbapi.com/?i=tt3896198&apikey=d7201b9b

const axios = require('axios');

function retrieveMovieInfo(listname="")
{
    const firebase = require('firebase');

    if (!firebase.apps.length) {
       firebase.initializeApp(config)
    }

    // @TODO should no longer be hard coded...get list from database
    console.log("Retreiving....");
    var codes = [];
    var list = [];

    movies.map( (code) => {
        codes.push(code);
        axios.get('https://www.omdbapi.com/?apikey=d7201b9b&i=' + code)
          .then(function (response) {
            // handle success
            // console.log(response);
            var item = {};
            item["id"] = code;
            item["filename"] = response.data.Poster;
            item["caption"] = response.data.Title + " | Director(s): " + response.data.Director + " | IMDB Rating: " + response.data.imdbRating;
            list.push(item);
            // var test = {name:"Ying", message: "yur", anon: false}
            var jsonBody = JSON.stringify(item);
            // Send Data to Firebase
            firebase.database().ref('Movies/' + item["id"]).set(jsonBody);
            console.log("then");
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
    })






    return list;
}

export default retrieveMovieInfo;
