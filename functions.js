/* Back to the Top Functions */

// Scroll Detection
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// Scroll back to the top 
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


/* Modal Functions */
function openModal(id)  {
    var modal = document.getElementById("myModal");
    var img = document.getElementById(id);
    var modalImg = document.getElementById("modal-content");
    var captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = img.src; // insert clicked image into modal content
    captionText.innerHTML = img.alt; // alt as caption

    // <span> element for "x" button to close the modal
    var span = document.getElementsByClassName("close")[0];

    // close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
}
