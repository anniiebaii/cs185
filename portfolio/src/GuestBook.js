import React, {Component} from 'react'
import GuestForm from "./GuestForm.js"
import GuestRecorder from './GuestRecorder.js'
import './GuestBook.css'

class GuestBook extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    _refresh = () => {

    }

    handleSubmit = (event) => {
        // give submission to GuestRecorder
        console.log("submit");
        console.log(event.target);
    }

    handleChange = (event) => {
        console.log("change");
        console.log(event.target);
    }

  render() {
      return ([
          <GuestRecorder/>,
          <GuestForm callBack={this.handleSubmit}/>

  ])
  }
}

export default GuestBook;
