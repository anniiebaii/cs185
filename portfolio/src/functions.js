/* Back to the Top Functions */

// Scroll Detection
function scrollFunction() {
    console.log("SCROLL");
    var mybutton = document.getElementById("back-to-top");
    var modal = document.getElementById("myModal");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
          if (modal !== null && modal.style.display !== "block")
          {
              mybutton.style.display = "block";

          }
          else if (modal == null)
          {
              mybutton.style.display = "block";
          }
          else
          {
              mybutton.style.display = "none";
          }
  } else {
    mybutton.style.display = "none";
  }
}
