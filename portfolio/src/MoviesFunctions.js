import React, {Component} from 'react'
import Gallery from './Gallery';
import movies from './movie_list.json';

// http://www.omdbapi.com/?i=tt3896198&apikey=d7201b9b

const axios = require('axios');

function retrieveMovieInfo(listname="")
{
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
            item["filename"] = response.data.Poster;
            item["caption"] = response.data.Title + " | Director(s): " + response.data.Director + " | IMDB Rating: " + response.data.imdbRating;
            list.push(item);
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
