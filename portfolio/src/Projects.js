import React, { Component } from 'react';
import BackToTop from './BackToTop.js';

class Projects extends Component {

    _refresh = (props) => {
        if (props === undefined)
        {
            props = this.props;
        }
    }
    componentDidUpdate() {
        this.render();
    }

    componentDidMount() {
    }

    render() {
      return ([
          <div key="headers">
              <button id="back-to-top" title="Go to top">^</button>
              <h2 className="subheader">Projects</h2>
              {<BackToTop/>}
          </div>,
          <div className="sub-page-container" key="ThinkFast-intro" style={{minHeight: "auto"}}>
              <h3 className="subheader_1">ThinkFast (2nd Year, 2018)</h3>
              <p className="text-body">
                  ThinkFast is a fun collection of brain-games that test a player's quick judgement and problem-solving skills while on a timer. As the player completes puzzles, the timer is extended, but the difficulty also increases. We currently have three mini games, which are described below.</p>
              <p className="text-body">To learn more about the rules of each game, read through our "ThinkFast Manual" in our <a href="https://github.com/MatthewPontarolo/ThinkFast">Github</a>. </p>
          </div>,
          <div className="sub-page-container" key="TouchMaze">
              <h4 className="paragraph_header">Touch Maze</h4>
              {/* Demo Video */}
              <video className="mobile-video" controls>
                  <source src={require('./videos/TouchMaze.mov')}type="video/mp4"></source>
              </video>
              <p className="text-body">
                  This minigame creates a randomly generated maze. The player has to complete the maze using the phone’s touchscreen interface, starting from the blue square and ending at the green square without lifting their finger.
                  If the player attempts an illegal move, such as touching a wall, using multiple fingers, or starting anywhere other than the blue square, the player will have to start over. </p>
          </div>,

          <div className="sub-page-container" key="CallOut">
              <h4 className="paragraph_header">CallOut</h4>
              {/* Demo Pictures */}
              <img className="mobile-image" src={require('./images/CallOut_2.png')} alt="CallOut"></img>
              <p className="text-body">
                  This minigame presents a word with half of the letters blanked out.
                  The player has to call out their guesses for what the word is.
                  The screen will indicate when the player gets it correct.
                  The player is also provided a category as a hint.</p>
          </div>,
          <div className="sub-page-container" key="ShakeQ">
              <h4 className="paragraph_header">ShakeQ</h4>
              {/* Demo Video */}
              <video className="mobile-video" controls>
                  <source src={require('./videos/ShakeQ.mov')} type="video/mp4"></source>
              </video>
              <p className="text-body">
                  This minigame shuffles through a series of random math expressions in two seconds and requires the user to perform an action when it corresponds to the indicated criteria.</p>
          </div>,
          <div className="sub-page-container" key="SpeedChess">
              <h3 className="subheader_1">SpeedChess (2nd Year, 2017)</h3>
              {/* Demo Video */}
              <video className="video" controls>
                  <source src={require('./videos/SpeedChess_Demo.mov')} type="video/mp4"></source>
              </video>
              <p className="text-body">
                A multiplayer game of chess, with some rules changed to make the game fast-paced with players having to utilize their predictive intuitions.
                Rather than alternating turns, players take turns and choose moves simultaneously, adding hidden information to the system of chess and requiring players to think a couple steps ahead of their opponents throughout the game.</p>
              <p className="text-body">
                If player A makes a move faster than player B, player A's move is prioritized.
                This is demonstrated in the final move of the demo video, where player on the left (A) makes a move quicker than player on the right (B).
                Player A wins because their knight captures player B's king, even though player B's queen intended to capture player A's knight. </p>
              <p className="text-body">To learn more about the rules of this game, visit our <a href="https://github.com/MatthewPontarolo/SpeedChess">Github</a>. </p>
         </div>
      ]
      );

  }
}

export default Projects;
