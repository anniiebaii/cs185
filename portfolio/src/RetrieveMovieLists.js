import React, {Component} from 'react'
import Gallery from './Gallery';
import movies from './movie_list.json';
import config from './config.js';


// http://www.omdbapi.com/?i=tt3896198&apikey=d7201b9b

const axios = require('axios');

function RetrieveMovieLists()
{
    const firebase = require('firebase');

    if (!firebase.apps.length) {
       firebase.initializeApp(config)
    }


    console.log("getting movie lists...");

    var data = {};
    var lists = [];
    var movieListsRef = firebase.database().ref("MovieLists");
    console.log(movieListsRef);

    //retrieve its data
    movieListsRef.on('value', snapshot => {
         //this is your call back function
             //state will be a JSON object after this
         //set your apps state to contain this data however you like
         // const state = snapshot.val()
         snapshot.forEach(function (childSnapshot) {
             {
                var list_name = childSnapshot.key;
                var movies = Object.values(childSnapshot.val());
                data[list_name] = movies;
                lists.push(list_name);
             }

         });
     });
    return data;
}

export default RetrieveMovieLists;
