import React, {useEffect, useState} from 'react';
import './GuestBook.css'
import config from './config.js'
import GuestForm from "./GuestForm.js"

const firebase = require('firebase');

function GuestRecorder() {
    const [data, setData] = useState([])
    const [shouldRender, setShouldRender] = useState(true)
    const sample = ["hi", "hello", "how are you", "test"]
    const dataSet = []

    // Send Data to Firebase
    //firebase.database().ref('data').push().set(jsonBody)
    //setShouldRender(!shouldRender) -- run when submitting to form

    // callback function for useEffect
    // basically runs the callback when shouldRender changes
    useEffect(() => {
        //It is necessary to check if firebase has already been initialized otherwise it will throw an exception if it tries to initialize again
        //You can put this code in your componentDidMount function, or in an Effect to make sure it is ran when the app loads.
        //Use the second argument to useEffect() to control how often it is ran
        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }

        //get a reference to the database
        let ref = firebase.database().ref('GuestBook')

        //retrieve its data
        ref.on('value', snapshot => {
             //this is your call back function
        		 //state will be a JSON object after this
             //set your apps state to contain this data however you like
             // const state = snapshot.val()
             snapshot.forEach(function (childSnapshot) {
                 dataSet.push(childSnapshot.val());
             });
             //since i use react 16, i set my state like this
             //i have previously declared a state variable like this: const [data, setData] = useState([]) so that I can make the below call
             console.log(dataSet);
             setData(dataSet);
        })
    }, [shouldRender]) // only run once when shouldRender changes




    // 1. Retrieve Data & Submit Data -- on retrieve always (2)
    // 2. Render GuestBook
    // 3. Render GuestForm -- onSubmit always pass into (1)
    //

    // @TODO submit data to firebase
    function updateBook()
    {

    }


    return (
        <div className="guest-book-display">
        {
            data.map((name, index) => (
                <p key = {index}>
                        {name}
                    </p>
            ))

        }




        </div>

    )

}

export default GuestRecorder;
