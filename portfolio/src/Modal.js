import React, { Component } from 'react'

class Modal extends Component {
    render() {
        return (
            <div id="myModal" className="modal">
              <span className="close">&times;</span>
              <img className="modal-content" id="modal-content"></img>
              <div id="caption"></div>
            </div>
        )
    }
}

export default Modal;
