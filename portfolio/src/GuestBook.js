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

    // componentDidUpdate() {
    //     this.render();
    //     console.log(this.state);
    // }
    // componentDidMount() {
    //     document.title = 'CMPSC 185';
    // }

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

      // REFACTOR: return Nav Bar here, pass in this.state.page as a prop into Nav Bar
      // Also pass in EventListener defined in HERE into NavBar as a prop
      // In NavBar onClick, run the EventListener we passed in
      // This class's this.state.page will update in EventListener
      // We re-render the thing with the new this.state.page and pass it as a prop into NavBar again!
      return ([
          <GuestRecorder/>,
          <GuestForm callBack={this.handleSubmit}/>

  ])
  }
}

export default GuestBook;
