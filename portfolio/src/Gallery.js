import React, { Component } from 'react'

type GalleryProps = {
    source: any;
    header: any;
    modalOptions: any;
    closeModalCallback: any;
    openModalCallback: any;
    pagination_number: integer;
}

type GalleryState = {
    select: any
}
class Gallery extends Component{
    constructor(props) {
        super(props);
        console.log(props);
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
        // this.render();
        console.log(this.state);
    }

    componentDidMount() {
        document.addEventListener('click', this.closeModal());
    }

    closeModal = (event: any) => {
        if (this.state.modal !== undefined)
        {
            console.log(event.target.id);
            console.log(event.target.className)
        }
        if (this.state.modal !== undefined &&
            (event.target.id === "close-button" ||
            (event.target.id !== "modal-content" &&
            event.target.className !== "modal-button")))
        {
            console.log("CLOSE MODAL");
            // var newModal = React.cloneElement(this.state.modal, {style: {display: "none"}});
            this.props.closeModalCallback();
            this.setState({modal: undefined}, this._refresh);
        }
    }

    openModal = (event : any) => {
        console.log("CLICKED MODAL");
        console.log(this.props.modalButtons);
        this.props.openModalCallback();
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
              <span id="caption">
                {event.target.alt}
                {this.props.modalButtons}
              </span>
              <span id="butt"></span>
            </div>

        )}, this._refresh);
    }

    // @TODO implement pagination using provided pagination_number
    render() {
        let images_list = [];
        if (this.props.source)
        {
            this.props.source.forEach((item) =>
                images_list.push(
                    <img key={item.filename}
                         className="modal-image"
                         src={ this.props.local === true ? require('./images/'+item.filename) : item.filename}
                         alt={item.caption}
                         onClick={this.openModal}
                       ></img>
                )
            );
        }

        return (
            <div className="sub-page-container" onClick={this.closeModal}>
                {this.props.header}
                {this.state.modal}
                {images_list}
            </div>
        )
    }
}

export default Gallery;
