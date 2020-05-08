import React, {useEffect, useState} from 'react';
import './GuestBook.css'
import config from './config.js'

const firebase = require('firebase');

function GuestBook() {
    const [data, setData] = useState([])
    const [shouldRender, setShouldRender] = useState(true)

    // Send Data to Firebase
    //firebase.database().ref('data').push().set(jsonBody)

    // callback function for useEffect
    useEffect(() => {
        //It is necessary to check if firebase has already been initialized otherwise it will throw an exception if it tries to initialize again
        //You can put this code in your componentDidMount function, or in an Effect to make sure it is ran when the app loads.
        //Use the second argument to useEffect() to control how often it is ran
        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }


        //get a reference to the database
        let ref = firebase.database().ref('data')

        console.log(ref);

        //retrieve its data
        ref.on('value', snapshot => {
             //this is your call back function
        		 //state will be a JSON object after this
             //set your apps state to contain this data however you like
             const state = snapshot.val()
             //since i use react 16, i set my state like this
             //i have previously declared a state variable like this: const [data, setData] = useState([]) so that I can make the below call
             setData(state)
        })
    }, [shouldRender]) // only run once when shouldRender changes



    return (
        <div> {data} </div>

    )

}

export default GuestBook;
