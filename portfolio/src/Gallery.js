import React, { Component } from 'react'
import './Gallery.css';

class Gallery extends Component{
    constructor(props) {
        super(props);
        console.log("==== GALLERY ======");
        console.log(props);
        this.state = {selected: undefined,
                      caption: undefined,
                      modal: undefined,
                      page: 1}
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.loadMore = this.loadMore.bind(this);
        // handle modalButtons
    }

    _refresh = (props) => {
        if (props === undefined)
        {
            props = this.props;
        }
        this.render();
    }

    componentDidUpdate() {
        // this.render();
        console.log(this.state);
    }

    componentDidMount() {
        document.addEventListener('click', this.closeModal());
    }

    closeModal = (event) => {
        if (this.state.modal !== undefined &&
            (event.target.id === "close-button" ||
            (event.target.id !== "modal-content" &&
             event.target.className !== "modal-button" &&
             event.target.className !== "sub-button")))
        {
            console.log("CLOSE MODAL");
            // var newModal = React.cloneElement(this.state.modal, {style: {display: "none"}});
            this.props.closeModalCallback();
            this.setState({modal: undefined}, this._refresh);
        }

        if (this.state.modal !== undefined && event.target.id === "delete")
        {
            this.props.closeModalCallback();
            this.setState({modal: undefined}, this._refresh);
        }
    }

    openModal = (event) => {
        console.log("CLICKED MODAL");
        this.props.openModalCallback();
        if (this.props.openModalUpdate != undefined)
        {
            this.props.openModalUpdate(event.target);
        }
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

    loadMore(event) {
        if (this.props.source.length > this.state.page * 8)
        {
            var new_page = this.state.page + 1;
            this.setState({page: new_page});
        }
    }

    // @TODO implement pagination using provided pagination_number
    render() {
        let images_list = [];
        console.log(this.props.source);
        if (this.props.source)
        {
            this.props.source.forEach((item) =>
                images_list.push(
                    <img key={item.id}
                         id={item.id}
                         className="modal-image"
                         src={this.props.local === true ? require('./images/'+item.filename) : item.filename}
                         alt={item.caption}
                         onClick={this.openModal}
                       ></img>
                )
            );
            console.log(images_list);
        }

        if (images_list.length === 0)
        {
            images_list.push(<h2 className="header" style={{align: "center"}}>No Results</h2>);
        }

        var end = false;
        if (images_list.length <= this.state.page * 8)
        {
            end = true;
        }

        return ([
            <div className="sub-page-container" onClick={this.closeModal}>
                {this.props.header}
                {this.state.modal}
                {images_list.splice(0, this.state.page*8)}
            </div>,
            <div className="footer">
                {end == false ?
                <div className="button"
                            onClick={this.loadMore}>Load More</div> : <div></div>}
            </div>
        ])
    }
}

export default Gallery;
