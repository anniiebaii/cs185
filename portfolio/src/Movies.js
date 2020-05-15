import React, {Component} from 'react'
import Gallery from './Gallery';
// http://www.omdbapi.com/?i=tt3896198&apikey=d7201b9b
//
const axios = require('axios');


const images = [
    {
        filename: 'https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg',
        caption: "Meet Appa, my German Shepherd puppy! He's named after the sky bison in Avatar the Last Air Bender. Appa is a stubborn puppy that won't let anything stop him from getting head scritches and naps on my lap."
    }
]
class Movies extends Component {

    render()
    {
        return(
            <Gallery local={false} source={images} openModalCallback={this.props.openModalCallback} closeModalCallback={this.props.closeModalCallback}/>
        )
    }
}
export default Movies;
