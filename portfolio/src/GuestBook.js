import React, {Component} from 'react'
import GuestForm from "./GuestForm.js"
import GuestRecorder from './GuestRecorder.js'
import './GuestBook.css'
import config from './config.js'

class GuestBook extends Component {

    constructor(props) {
        super(props);
        this.state = {submit: false, submission: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.retrieveData = this.retrieveData.bind(this);
    }

    _refresh = () => {

    }

    retrieveData() {
        const firebase = require('firebase');

        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }

        //get a reference to the database
        let ref = firebase.database().ref('GuestBook')
        let dataSet = [];

        //retrieve its data
        ref.on('value', snapshot => {
             //this is your call back function
        		 //state will be a JSON object after this
             //set your apps state to contain this data however you like
             // const state = snapshot.val()
             snapshot.forEach(function (childSnapshot) {
                 if (childSnapshot.val().anon === false)
                 {
                     dataSet.push(childSnapshot.val());
                 }
             });
        });

        return dataSet;
    }



    handleSubmit = (event) => {
        // @TODO give submission to GuestRecorder
        console.log("submit");
        // console.log(event.target);

        // const firebase = require('firebase');
        //
        // if (!firebase.apps.length) {
        //    firebase.initializeApp(config)
        // }
        // var test = {name:"Ying", message: "yur", anon: false}
        // var jsonBody = JSON.stringify(test);
        // // Send Data to Firebase
        // firebase.database().ref('GuestBook').push().set(jsonBody)
        this.render();
    }

  render() {
      console.log("render");
      let dataSet = this.retrieveData();
      // console.log(dataSet);

      const dataElements =  dataSet.map((item, index) =>
                              <p key = {index}>
                                      {item.name}, {item.message}
                              </p>);
      // console.log(dataElements);
      return ([
          <GuestRecorder/>,
          <GuestForm key="form" callBack={this.handleSubmit}/>

  ])
  }
}

export default GuestBook;
