import React, {useEffect, useState} from 'react';
import './GuestBook.css'
import config from './config.js'

const firebase = require('firebase');

function GuestRecorder(props) {
    const [data, setData] = useState([])
    const [shouldRender, setShouldRender] = useState(true)
    var dataSet = []

    console.log(props.info)

    var info = props.info

    useEffect(() => {

        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }

        //get a reference to the database
        let ref = firebase.database().ref('GuestBook')

        dataSet = [];

        //retrieve its data
        ref.on('value', snapshot => {
             //this is your call back function
        		 //state will be a JSON object after this
             //set your apps state to contain this data however you like
             // const state = snapshot.val()
             snapshot.forEach(function (childSnapshot) {
                 var value = JSON.parse(childSnapshot.val());
                 if (value["anon"] === false)
                 {
                     dataSet.push(value);
                 }
             });
             console.log(dataSet);
             setData(dataSet);
        })

    }, [shouldRender]) // only run once when shouldRender changes

    return (
        <div className="guest-book-display">
        {
            data.map((item, index) => (
                <div key={item} className="guest-book-content">
                    <h3 className="guest-book-name">{item["name"]} <br></br>{item["bio"]}</h3>
                    <p key = {index} className="guest-book-body">
                            {item["message"]}</p>
                </div>

            ))
        }
        </div>
    )

}

export default GuestRecorder;
