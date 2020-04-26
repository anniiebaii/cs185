import React from 'react';

function Gallery() {
  return (
      <div className="page-container">
        <div className="sub-page-container">

            <h2 className="subheader">Gallery</h2>
            {/*Back to the Top Button*/}
            {/* ADD ONCLICK topFunction() */}
            <button id="back-to-top" title="Go to top">^</button>

            {/* The Modal Fragment */}
            <div id="myModal" className="modal">
              <span className="close">&times;</span>
              <img className="modal-content" id="modal-content"></img>
              <div id="caption"></div>
            </div>

            <script>
            {/*
              // Back to Top button listener
              var mybutton = document.getElementById("back-to-top");
              window.onscroll = function() {scrollFunction()};

              var modal = document.getElementById("myModal");
              window.onclick = function(event) {
                  if (event.target == modal) {
                      modal.style.display = "none";
                      scrollFunction();
                  }
              }
              */}
            </script>
            {/* <!-- Images Gallery in TODO: Photo Grid--> */}
            {/* ADD onClick="openModal(id)" */}
            <img id="img01"
                 className="modal-image"
                 src={require('./images/appa01.jpg')}
                 alt="Meet Appa, my German Shepherd puppy! He's named after the sky bison in Avatar the Last Air Bender. Appa is a stubborn puppy that won't let anything stop him from getting head scritches and naps on my lap."
                 ></img>
            <img id="img02"
                 className="modal-image"
                 src={require('./images/appa02.jpg')}
                 alt="Appa"
                 ></img>
            <img id="img03"
                 className="modal-image"
                 src={require('./images/appa03.jpg')}
                 alt="Appa getting the pets."
                 ></img>
            <img id="img04"
                 className="modal-image"
                 src={require('./images/ucsb01.jpg')}
                 alt="UCSB beaches are gorgeous."
                 ></img>
            <img id="img05"
                 className="modal-image"
                 src={require('./images/ucsb02.jpg')}
                 alt="UCSB Sunsets"
                 ></img>
        </div>
      </div>
  );
}

export default Gallery;
