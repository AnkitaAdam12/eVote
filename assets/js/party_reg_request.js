
// const form = document.querySelector('form');
const closeModal = document.getElementById("close");

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

// window.addEventListener('pageshow', function(event) {
//   // Check if the current page is the dashboard page and was loaded from the cache
//   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/party_reg_request') {
//     // Redirect the user to the homepage
//     window.location.href = '/adminDashboard';
//   }
// });

// window.addEventListener('pageshow', function(event) {
//   // Check if the current page is the dashboard page and was loaded from the cache
//   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/candidate_reg_request') {
//     // Redirect the user to the homepage
//     window.location.href = '/partyDashboard';
//   }
// });
