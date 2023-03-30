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

// window.addEventListener('popstate', function (event) {
//   // Check if the current URL is the dashboard page
//   if (window.location.pathname === '/voterDashboard') {
//     // Redirect the user to the homepage
//     window.location.href = '/';
//   }
// });
// window.addEventListener('pageshow', function(event) {
//   // Check if the current page is the dashboard page and was loaded from the cache
//   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/VoterDashboard') {
//     // Redirect the user to the homepage
//     window.location.href = '/';
//   }
// });

// window.addEventListener('pageshow', function(event) {
//   // Check if the current page is the dashboard page and was loaded from the cache
//   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/ActualVote') {
//     // Redirect the user to the homepage
//     window.location.href = '/';
//   }
// });

// window.addEventListener('pageshow', function(event) {
//   // Check if the current page is the dashboard page and was loaded from the cache
//   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/firstStep') {
//     // Redirect the user to the homepage
//     window.location.href = '/';
//   }
// });

// window.addEventListener('pageshow', function(event) {
//   // Check if the current page is the dashboard page and was loaded from the cache
//   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/votingresults') {
//     // Redirect the user to the homepage
//     window.location.href = '/';
//   }
// });