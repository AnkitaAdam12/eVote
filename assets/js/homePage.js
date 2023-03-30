
var x = document.getElementById('alert-border-3');
// const form = document.querySelector('form');

const closeModal = document.getElementById("closeModal");

// Hide the modal if the user clicks outside of it
window.addEventListener('click',function(event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Hide the modal
closeModal.addEventListener('click', function () {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
});

// x.classList.add('hidden');

x.addEventListener('click', function () {
    x.classList.add('hidden');
});




// Show the modal
function showModal() {
  modal.style.display = "block";
}


// closeModal.onclick = function() {
//   modal.style.display = "none";
// };



function hide()
{
    modal.style.display = "none";
}