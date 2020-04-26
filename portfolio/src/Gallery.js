import React, { Component } from 'react'

class Gallery extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { source } = this.props
        let images_list = [];
        source.forEach((item) =>
            images_list.push(
                <img key={item.filename}
                     className="modal-image"
                     src={require('./images/'+item.filename)}
                     alt={item.caption}
                   ></img>
            )
        );
        return (
            <div className="page-container">
              <div className="sub-page-container">

                  <h2 className="subheader">Gallery</h2>
                  {/*Back to the Top Button*/}
                  {/* ADD ONCLICK topFunction() */}
                  <button id="back-to-top" title="Go to top">^</button>

                  {/* TODO: The Modal Fragment */}
                  {/* <!-- Images Gallery in TODO: Photo Grid--> */}
                  {/* ADD onClick="openModal(id)" */}


                  {images_list}
              </div>
            </div>
        )
    }
}

export default Gallery;
