const form = document.querySelector("form"),
  submit = document.querySelector(".submit"),
  allInput = form.querySelectorAll(".first input");

// for elements
const fname = document.getElementById("name");
const dob = document.getElementById("dob");
const marritalStatus = document.getElementById("marritalStatus");
const gender = document.getElementById("gender");
const email = document.getElementById("email");
// const photo = document.getElementById('picture');
const photo = document.querySelector("input[type='file']");
console.log(photo);
const quali = document.getElementById("quali");
const position = document.getElementById("position");

const emailReg =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const pwdReg = /^(?!.*\s)[\w\d\W]{8,20}$/;
const nameFormat = /^[a-zA-Z\s]+$/;

// const passwordInput = document.getElementById("pwd1");
// const passwordInput2 = document.getElementById("pwd2");
// const passwordIcon = document.getElementById("password-icon");
// const passwordIcon2 = document.getElementById("password-icon2");

// passwordIcon.addEventListener("click", function() {
//   if (passwordInput.type === "password") {
//     passwordInput.type = "text";
//     passwordIcon.classList.remove("fa-eye");
//     passwordIcon.classList.add("fa-eye-slash");
//   } else {
//     passwordInput.type = "password";
//     passwordIcon.classList.remove("fa-eye-slash");
//     passwordIcon.classList.add("fa-eye");
//   }
// });

// passwordIcon2.addEventListener("click", function() {
//     if (passwordInput2.type === "password") {
//       passwordInput2.type = "text";
//       passwordIcon2.classList.remove("fa-eye");
//       passwordIcon2.classList.add("fa-eye-slash");
//     } else {
//       passwordInput2.type = "password";
//       passwordIcon2.classList.remove("fa-eye-slash");
//       passwordIcon2.classList.add("fa-eye");
//     }
//   });
// nextBtn.addEventListener("click", ()=> {
//     if(checkNxt()){
//         form.classList.add('secActive');
//     }else{
//         form.classList.remove('secActive');
//     }
// })

// to display previous content
// backBtn.addEventListener("click", () => form.classList.remove('secActive'));

// code to display next content
// form.addEventListener("submit", e => {
//     e.preventDefault();
// });

// validations on submit button onclick
function submitForm1() {
  flag1 = checkSubmit();
  if (flag1 == true) {
    // console.log(flag1)
    send1();
    // send(event);
    // alert("OTP VALIDATED!");
  }
}

function checkSubmit() {
  // trim to remove the whitespaces
  const nameValue = fname.value.trim();
  const dobValue = dob.value.trim();
  const marrValue = marritalStatus.value.trim();
  const genderValue = gender.value.trim();
  const emailValue = email.value.trim();
  const qualiValue = quali.value.trim();
  const positionValue = position.value.trim();
  const toDate = new Date();
  let flag = true;

  if (nameValue === "") {
    console.log("Name can't be empty");
    flag = false;
    setErrorFor(fname, "Candidate's name can't be blank");
  } else if (!nameFormat.test(nameValue)) {
    console.log("Name can't contain numbers");
    flag = false;
    setErrorFor(fname, "Name can't contain numbers");
  } else {
    setSuccessFor(fname);
  }

  var birth = new Date(dobValue);
  //calculate month difference from current date in time
  var month_diff = Date.now() - birth.getTime();
  //convert the calculated difference in date format
  var age_dt = new Date(month_diff);
  //extract year from date
  var year = age_dt.getUTCFullYear();
  //now calculate the age of the user
  var userAge = Math.abs(year - 1970);

  if (dobValue == "" || dobValue == null) {
    console.log("Please select the date");
    flag = false;
    setErrorFor(dob, "please select the date");
  } else if (new Date(dobValue).getTime() >= toDate.getTime()) {
    console.log("Please select valid date of birth");
    setErrorFor(dob, "please select valid date");
    flag = false;
  } else if (userAge < 25) {
    console.log("Candidate's age must be greter than 25");
    flag = false;
    setErrorFor(dob, "Candidate's age must be greter than 25");
  } else {
    setSuccessFor(dob);
  }

  if (marrValue === "") {
    flag = false;
    setErrorFor(marritalStatus, "Select Marrital Status");
  } else {
    setSuccessFor(marritalStatus);
  }

  if (genderValue === "") {
    flag = false;
    setErrorFor(gender, "Select Marrital Status");
  } else {
    setSuccessFor(gender);
  }

  //   if(memberCount<=0){
  //       console.log("Member's count can't be zero or negative");
  //       flag = false;
  //       setErrorFor(count, "Member's count can't be zero or negative");
  // }
  //   else if( memberCount<=100){
  //       console.log("More than 100 members are required for successful registration");
  //       flag = false;
  //       setErrorFor(count, "More than 100 members are required for successful registration");
  //   }
  //   else {
  // 	setSuccessFor(count);
  // }

  if (!emailReg.test(emailValue)) {
    console.log("invalid email id");
    flag = false;
    setErrorFor(email, "invalid email id");
  } else {
    setSuccessFor(email);
  }

  if (photo.files == null || photo.files.length == 0) {
    console.log("Logo is not uploaded");
    flag = false;
    setErrorFor(photo, "upload party logo");
  } else {
    setSuccessFor(photo);
  }

  if (qualiValue === "") {
    flag = false;
    setErrorFor(quali, "Enter Qualification");
  }  else {
    setSuccessFor(quali);
  }

  if (positionValue === "") {
    flag = false;
    setErrorFor(position, "Enter Position to be Applied for");
  }  else {
    setSuccessFor(position);
  }

  

  console.log(flag);
  return flag;
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector(".small");
  formControl.className = "input-field error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "input-field success";
}

// const form = document.querySelector('form');
const closeModal = document.getElementById("close");

// Hide the modal if the user clicks outside of it
window.addEventListener("click", function (event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Hide the modal
closeModal.addEventListener("click", function () {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
});

function send1() {
  document.getElementById("candidateReg").submit();
}

// function send(event) {
//   event.preventDefault();

//   const data = new FormData(form);

//   fetch("/partyReg", {
//     method: "POST",
//     body: data,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // Show the modal if the record was inserted successfully
//       if (data.message === "Record inserted successfully!") {
//         showModal();
//       }
//     });
// }

// window.addEventListener('pageshow', function(event) {
//   // Check if the current page is the dashboard page and was loaded from the cache
//   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/candidateReg') {
//     // Redirect the user to the homepage
//     window.location.href = '/';
//   }
// });

// window.addEventListener('pageshow', function(event) {
//   // Check if the current page is the dashboard page and was loaded from the cache
//   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/nominatecandidate') {
//     // Redirect the user to the homepage
//     window.location.href = '/';
//   }
// });