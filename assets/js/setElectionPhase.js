const currentPhase = document.getElementById('current-phase');
const radios = document.querySelectorAll('input[type="radio"]');
const submitButton = document.getElementById('savePhase');

// Disable radio buttons that have already been selected
function disableRadioButtons() {
  radios.forEach(radio => {
    if (radio.value === currentPhase.textContent) {
      radio.disabled = true;
    }
  });
}

// Enable the submit button when a radio button is selected
function enableSubmitButton() {
  radios.forEach(radio => {
    radio.addEventListener('change', event => {
      submitButton.disabled = false;
    });
  });
}

// Update the current phase when the form is submitted
function updateCurrentPhase(event) {
  event.preventDefault();
  const selectedPhase = document.querySelector('input[name="electionphase"]:checked').value;
  currentPhase.textContent = selectedPhase;
  // disableRadioButtons();
  submitButton.disabled = true;
  send();
}
// Initialize the form
disableRadioButtons();
enableSubmitButton();
submitButton.addEventListener('click', updateCurrentPhase);
function send() {
  document.getElementById("ep").submit();
}

function setNextPhase(){
  var nxt=document.getElementById('nxt').value;
  console.log(nxt);
  radios.forEach(radio => {
    if (radio.value != nxt) {
      radio.disabled = true;
    }
    else{
      radio.disabled = false;
    }
  });
}

// window.addEventListener('pageshow', function(event) {
//   // Check if the current page is the dashboard page and was loaded from the cache
//   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/Electionphase') {
//     // Redirect the user to the homepage
//     window.location.href = '/';
//   }
// });
