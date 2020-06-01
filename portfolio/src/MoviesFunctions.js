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

    // movies.map( (code) => {
    //     // codes.push(code);
    //     axios.get('https://www.omdbapi.com/?apikey=d7201b9b&i=' + code)
    //       .then(function (response) {
    //         // handle success
    //         // console.log(response);
    //         var item = {};
    //         item["id"] = code;
    //         item["title"] = response.data.Title;
    //         item["filename"] = response.data.Poster;
    //         item["caption"] = response.data.Title + " | Director(s): " + response.data.Director + " | IMDB Rating: " + response.data.imdbRating;
    //         // list.push(item);
    //         // var test = {name:"Ying", message: "yur", anon: false}
    //         var jsonBody = JSON.stringify(item);
    //         // Send Data to Firebase
    //         firebase.database().ref('Movies/' + item["id"]).set(jsonBody);
    //         console.log("then");
    //       })
    //       .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //       })
    //       .then(function () {
    //         // always executed
    //       });
    // })
    
    

    //get a reference to the database
    let ref = firebase.database().ref('Movies')
    let data = [];
    let dataSet = [];

    //retrieve its data
    ref.on('value', snapshot => {
         //this is your call back function
             //state will be a JSON object after this
         //set your apps state to contain this data however you like
         // const state = snapshot.val()
         snapshot.forEach(function (childSnapshot) {
             dataSet.push(JSON.parse(childSnapshot.val()));

         });
    });

    console.log(dataSet);


    return dataSet;


}

export default retrieveMovieInfo;
