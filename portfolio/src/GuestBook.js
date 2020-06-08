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
        this.render();
    }

  render() {
      console.log("render");
      let dataSet = this.retrieveData();

      const dataElements =  dataSet.map((item, index) =>
                              <p key = {index}>
                                      {item.name}, {item.message}
                              </p>);
      return ([
          <GuestRecorder/>,
          <GuestForm key="form" callBack={this.handleSubmit}/>

  ])
  }
}

export default GuestBook;
