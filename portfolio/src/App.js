import React, { Component } from 'react'
import './App.css';

class App extends Component {
    changeTabs = (event : any) => {
        console.log(event.target.id);
        console.log(event.target);

        this.setState({page: event.target.id}, this._refresh);

    }

    _refresh = (props?: NavigationProps) => {
        if (props === undefined)
        {
            props = this.props;
        }
        console.log(this.state);
    }

    componentDidUpdate() {
        this.render();
        console.log(this.state);
    }
    componentDidMount() {
        document.title = 'CMPSC 185';
    }

  render() {
      return (
          <div className="header">
            <h1 className="header">annie bai</h1>
          </div>
  )
  }
}

export default App;
