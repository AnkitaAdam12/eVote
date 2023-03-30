// Get the button element
var pageUpButton = document.querySelector('.page-up-button');

// Add a scroll event listener to the window
window.addEventListener('scroll', function() {
  // If the user has scrolled down more than the height of the viewport, show the button
  if (window.scrollY > window.innerHeight) {
    pageUpButton.style.display = 'block';
  } else {
    pageUpButton.style.display = 'none';
  }
});

// Add a click event listener to the button
pageUpButton.addEventListener('click', function() {
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
});