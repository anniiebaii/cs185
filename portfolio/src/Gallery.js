import React, { Component } from 'react'

type GalleryProps = {
    source: any
}

type GalleryState = {
    select: any
}
class Gallery extends Component<GalleryProps, GalleryState>{
    constructor(props : GalleryProps) {
        super(props);
        this.state = {}
    }

    render() {
        let images_list = [];
        this.props.source.forEach((item) =>
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
