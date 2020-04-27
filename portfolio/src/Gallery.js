import React, { Component } from 'react'
import scrollFunction from './functions.js'

type GalleryProps = {
    source: any
}

type GalleryState = {
    select: any
}
class Gallery extends Component<GalleryProps, GalleryState>{
    constructor(props : GalleryProps) {
        super(props);
        this.state = {selected: undefined,
                      caption: undefined,
                      modal: undefined}
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    _refresh = (props?: GalleryProps) => {
        if (props == undefined)
        {
            props = this.props;
        }
    }

    componentDidUpdate() {
        this.render();
        console.log(this.state);
    }

    componentDidMount() {
        window.addEventListener("scroll", scrollFunction);
    }

    closeModal = (event: any) => {
        console.log("CLOSE MODAL");
        var newModal = React.cloneElement(this.state.modal, {style: {display: "none"}});
        this.setState({modal: newModal}, this._refresh);
        // @TODO
        // scrollFunction();
    }

    openModal = (event : any) => {
        console.log("CLICKED MODAL");
        this.setState({modal: (
            <div id="myModal" className="modal" style={{display: "block"}}>
              <span className="close"
                    onClick={this.closeModal}>&times;</span>
              <img className="modal-content"
                   id="modal-content"
                   src={event.target.src}
                   ></img>
              <span id="caption">{event.target.alt}</span>
            </div>

        )}, this._refresh);
    }

    render() {
        let images_list = [];
        this.props.source.forEach((item) =>
            images_list.push(
                <img key={item.filename}
                     className="modal-image"
                     src={require('./images/'+item.filename)}
                     alt={item.caption}
                     onClick={this.openModal}
                   ></img>
            )
        );
        return (
            <div className="sub-page-container">
                {/* <!-- The Modal Fragment --> */}

                <h2 className="subheader">Gallery</h2>
                {/*Back to the Top Button*/}
                {/* ADD ONCLICK topFunction() */}
                <button id="back-to-top" title="Go to top">^</button>

                {/* TODO: The Modal Fragment */}
                {/* <!-- Images Gallery in TODO: Photo Grid--> */}
                {/* ADD onClick="openModal(id)" */}

                {this.state.modal}
                {images_list}
            </div>
        )
    }
}

export default Gallery;
