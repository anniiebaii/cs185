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
        if (props === undefined)
        {
            props = this.props;
        }
    }

    componentDidUpdate() {
        this.render();
        console.log(this.state);
    }

    componentDidMount() {
        document.addEventListener('scroll', scrollFunction);
        document.addEventListener('click', this.closeModal());
    }

    closeModal = (event: any) => {
        if (this.state.modal !== undefined)
        {
            console.log(event.target.id);
        }
        if (this.state.modal !== undefined &&
            (event.target.id === "close-button" ||
            event.target.id !== "modal-content"))
        {
            console.log("CLOSE MODAL");
            // var newModal = React.cloneElement(this.state.modal, {style: {display: "none"}});
            this.setState({modal: undefined}, this._refresh);
        }
    }

    openModal = (event : any) => {
        console.log("CLICKED MODAL");
        this.setState({modal: (
            <div id="myModal" className="modal" style={{display: "block"}}>
              <span className="close"
                    id="close-button"
                    onClick={this.closeModal}>&times;</span>
              <img className="modal-content"
                   id="modal-content"
                   src={event.target.src}
                   alt="modal-content"
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
            <div className="sub-page-container" onClick={this.closeModal}>
                <h2 className="subheader">Gallery</h2>
                {this.state.modal}
                {images_list}
            </div>
        )
    }
}

export default Gallery;
