
window.onscroll = function() {myFunction()};


var navbar = document.getElementById("home-nav");
var links=document.getElementById("1");

var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= 2) {

    navbar.classList.add("sticky")
    links.classList.add("links")
  } else {
    navbar.classList.remove("sticky");

  }
}
