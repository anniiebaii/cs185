import React, { Component } from 'react'

class BackToTop extends Component {
    // Scroll back to the top
    topFunction() {
        console.log("scroll to top");
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    render() {
        return(
            <button id="back-to-top" title="Go to top" onClick={this.topFunction}>^</button>
        );
    }
}

export default BackToTop;
