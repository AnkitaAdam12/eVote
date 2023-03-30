// // const form = document.querySelector('form');
// const closeModal = document.getElementById("close1");

// // Hide the modal if the user clicks outside of it
// window.addEventListener('click',function(event) {
//   const modal = document.getElementById("myModal");
//   if (event.target === modal) {
//     modal.style.display = "none";
//   }
// });

// // Hide the modal
// closeModal.addEventListener('click', function () {
//   const modal = document.getElementById("myModal");
//   modal.style.display = "none";
// });

// const form = document.querySelector('form');
const closeModal = document.getElementById("close1");
const fname = document.getElementById('name');
const age = document.getElementById('age');
const mcnt = document.getElementById('mcnt');
const email = document.getElementById('email');
const nameFormat = /^[a-zA-Z\s]+$/;
const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const numFormat = /^[0-9]+$/;

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

// validations on submit button onclick
function submitForm() {
  flag1 = checkSubmit();
  if (flag1 == true) {

      // console.log(flag1)
      send();
      // alert("OTP VALIDATED!");
  }
}

function checkSubmit() {
  // trim to remove the whitespaces
  const nameValue = fname.value.trim();
  const ageValue = age.value.trim();
  const mcntValue=mcnt.value.trim();
  const emailValue = email.value.trim();
  let flag = true;

  if (nameValue === '') {
      flag = false;
      setErrorFor(fname, "Name can't be empty");
  } else if (!nameFormat.test(nameValue)) {
      flag = false;
      setErrorFor(fname, "name should not contain numbers");
  }
  else {
      setSuccessFor(fname);
  }


  if(ageValue === ''){
    setErrorFor(age, 'enter your age');
    flag = false
  }else if(ageValue < 25){
      setErrorFor(age, 'not eligible');
      flag = false
  }else if(!numFormat.test(parseInt(ageValue))){
    console.log("Please enter valid age");
    setErrorFor(age, 'Please enter valid age');
    flag = false
  }else {
    setSuccessFor(age);
  }

  if(!numFormat.test(mcntValue)){
    setErrorFor(mcnt, 'Count is invalid');
    flag = false
  }else if(mcntValue<200){
    setErrorFor(mcnt, 'Count should be more than 200');
    flag = false
  }
  else {
    setSuccessFor(mcnt);
  }

  if(!emailReg.test(emailValue)){
    console.log("invalid email id")
    setErrorFor(email, 'invalid email id');
    flag = false;
  }else {
    setSuccessFor(email);
  }

  console.log(flag);
  return flag;
}


function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('.small');
  formControl.className = 'col-sm-9 text-secondary error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'col-sm-9 text-secondary success';
}

function send() {
  document.getElementById("pe").submit();
}

// window.addEventListener('pageshow', function(event) {
//   // Check if the current page is the dashboard page and was loaded from the cache
//   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/update_partyProfile') {
//     // Redirect the user to the homepage
//     window.location.href = '/partyDashboard';
//   }
// });

