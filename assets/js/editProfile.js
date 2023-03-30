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
const phno = document.getElementById('phno');
const email = document.getElementById('email');
const nameFormat = /^[a-zA-Z\s]+$/;
const phnoReg = /^[7-9]{1}[0-9]{9}$/;
const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ageFormat = /^[0-9]+$/;

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
  const phnoValue=phno.value.trim();
  const emailValue = email.value.trim();
  let flag = true;

  if (nameValue === '') {
      console.log("Name can't be empty")
      flag = false;
      setErrorFor(fname, "Name can't be empty");
  } else if (!nameFormat.test(nameValue)) {
      console.log("name should not contain numbers")
      flag = false;
      setErrorFor(fname, "name should not contain numbers");
  }
  else {
      setSuccessFor(fname);
  }


  if(ageValue === ''){
    console.log("enter your age");
    setErrorFor(age, 'enter your age');
    flag = false
  }else if(ageValue < 18){
      console.log("not eligible for voting");
      setErrorFor(age, 'not eligible for voting');
      flag = false
  }else if(!ageFormat.test(ageValue)){
    console.log("Please enter valid age");
    setErrorFor(age, 'Please enter valid age');
    flag = false
  }else {
    setSuccessFor(age);
  }

  if(!phnoReg.test(phnoValue)){
    console.log("Phone number is invalid");
    setErrorFor(phno, 'Phone number is invalid');
    flag = false
  }else {
    setSuccessFor(phno);
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
  document.getElementById("ve").submit();
}

// window.addEventListener('pageshow', function(event) {
//   // Check if the current page is the dashboard page and was loaded from the cache
//   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/updateProfile') {
//     // Redirect the user to the homepage
//     window.location.href = '/voterDashboard';
//   }
// });
