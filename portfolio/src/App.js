import React, {Component} from 'react'
import './App.css';
import './GuestBook.css';

class App extends Component {
    changeTabs = (event : any) => {
        console.log(event.target.id);
        console.log(event.target);
    }

    _refresh = (props?: NavigationProps) => {
        if (props === undefined)
        {
            props = this.props;
        }
        console.log(this.state);
    }

    // componentDidUpdate() {
    //     // this.render();
    //     // console.log(this.state);
    // }
    componentDidMount() {
        document.title = 'CMPSC 185';
    }

  render() {

      // REFACTOR: return Nav Bar here, pass in this.state.page as a prop into Nav Bar
      // Also pass in EventListener defined in HERE into NavBar as a prop
      // In NavBar onClick, run the EventListener we passed in
      // This class's this.state.page will update in EventListener
      // We re-render the thing with the new this.state.page and pass it as a prop into NavBar again!
      return (
          <div className="header">
            <h1 className="header">annie bai</h1>
          </div>
  )
  }
}

export default App;
