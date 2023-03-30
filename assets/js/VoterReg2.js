const form = document.querySelector("form"),
    submit = document.querySelector(".submit"),
    allInput = form.querySelectorAll(".first input");

// for elements
const fname = document.getElementById('name');
const dob = document.getElementById('dob');
const phno = document.getElementById('phno');
// const aadhar = document.getElementById('aadhar');
// const email = document.getElementById('email');
// const photo = document.getElementById('picture');
const photo = document.querySelector("input[type='file']");
console.log(photo)
const pwd1 = document.getElementById('pwd1');
const pwd2 = document.getElementById('pwd2');

const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phnoReg = /^[7-9]{1}[0-9]{9}$/;
const pwdReg = /^(?!.*\s)[\w\d\W]{8,20}$/;
const aadharReg = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
const passwordInput = document.getElementById("pwd1");
const passwordInput2 = document.getElementById("pwd2");
const passwordIcon = document.getElementById("password-icon");
const passwordIcon2 = document.getElementById("password-icon2");


passwordIcon.addEventListener("click", function() {
if (passwordInput.type === "password") {
passwordInput.type = "text";
passwordIcon.classList.remove("fa-eye");
passwordIcon.classList.add("fa-eye-slash");
} else {
passwordInput.type = "password";
passwordIcon.classList.remove("fa-eye-slash");
passwordIcon.classList.add("fa-eye");
}
});

passwordIcon2.addEventListener("click", function() {
if (passwordInput2.type === "password") {
passwordInput2.type = "text";
passwordIcon2.classList.remove("fa-eye");
passwordIcon2.classList.add("fa-eye-slash");
} else {
passwordInput2.type = "password";
passwordIcon2.classList.remove("fa-eye-slash");
passwordIcon2.classList.add("fa-eye");
}
});




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
    const dobValue = dob.value.trim();
    const phnoValue = phno.value.trim();
    // const aadharValue = aadhar.value.trim();
    // const emailValue = email.value.trim();
    const pwd1Value = pwd1.value.trim();
    const pwd2Value = pwd2.value.trim();
    const toDate = new Date();
    var birth = new Date(dobValue);
    //calculate month difference from current date in time  
    var month_diff = Date.now() - birth.getTime();
    //convert the calculated difference in date format  
    var age_dt = new Date(month_diff);
    //extract year from date      
    var year = age_dt.getUTCFullYear();
    //now calculate the age of the user  
    var userAge = Math.abs(year - 1970);
    let flag = true;

    if (nameValue === '') {
        console.log("Name can't be empty")
        flag = false;
        setErrorFor(fname, 'name cannot be blank');
    } else {
        setSuccessFor(fname);
    }

    if (dobValue == "" || dobValue == null) {
        console.log("Please select the date");
        flag = false;
        setErrorFor(dob, 'please select the date');
    } else if (new Date(dobValue).getTime() >= toDate.getTime()) {
        console.log("Please select valid date of birth")
        setErrorFor(dob, 'please select valid date');
        flag = false;
    } else if (userAge < 18) {
        setErrorFor(dob, 'age restricted for registration');
        flag = false;
    }
    else {
        setSuccessFor(dob);
    }

    if (!phnoReg.test(phnoValue)) {
        console.log("Phone number is invalid");
        flag = false
        setErrorFor(phno, 'phone number is invalid');
    } else {
        setSuccessFor(phno);
    }

    // if(!aadharReg.test(aadharValue)){
    //     console.log("Aadhar number is invalid");
    //     flag = false
    //     setErrorFor(aadhar, 'Aadhar number is invalid');
    // }else{
    //     setSuccessFor(aadhar);
    // }


    // if(!emailReg.test(emailValue)){
    //     console.log("invalid email id")
    //     flag = false;
    //     setErrorFor(email, 'invalid email id');
    // }else{
    //     setSuccessFor(email);
    // }

    if (photo.files == null || photo.files.length == 0) {
        console.log("invalid email id")
        flag = false;
        setErrorFor(photo, 'invalid email id');
    } else {
        setSuccessFor(photo);
    }

    if (pwd1Value.length < 8) {
        console.log("password must be greater than 8 characters")
        flag = false;
        setErrorFor(pwd1, 'password must be greater than 8 characters');
    } else if (!pwdReg.test(pwd1Value)) {
        console.log("password should not contain spaces")
        flag = false;
        setErrorFor(pwd1, 'password should not contain spaces');
    } else {
        setSuccessFor(pwd1);
    }

    if (pwd2Value === '') {
        console.log("enter password")
        flag = false;
        setErrorFor(pwd2, "enter password");
    } else if (pwd2Value != pwd1Value) {
        console.log("Password doesn't match")
        flag = false;
        setErrorFor(pwd2, "Password doesn't match");
    } else {
        setSuccessFor(pwd2);
    }

    console.log(flag);
    return flag;
}

// function checkSubmit(){
//     // form elements value
//     var flag = true;


//     var selected = null;
//     // photo.onchange = function(){
//     //     selected = photo.files[0];
//     // }
//     // if(photo == null ){
//     //     setErrorFor(photo, 'please select file');
//     // }else{
//     //     setSuccessFor(photo);
//     // }
//     if(pwd1Value.length < 8){
//         console.log("password must be greater than 8 characters")
//         flag = false;
//         setErrorFor(pwd1, 'password must be greater than 8 characters');
//     }else if(!pwdReg.test(pwd1Value)){
//         console.log("password should not contain spaces")
//         flag = false;
//         setErrorFor(pwd1, 'password should not contain spaces');
//     }else{
//         setSuccessFor(pwd1);
//     }
//     if(pwd2Value != pwd1Value){
//         console.log("Password doesn't match")
//         flag = false;
//         setErrorFor(pwd2, "Password doesn't match");
//     }else{
//         setSuccessFor(pwd2);
//     }
//     return flag
// }


function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('.small');
    formControl.className = 'input-field error';
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'input-field success';
}
function send() {
    document.getElementById("reg").submit();
}

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
//     // Check if the current page is the dashboard page and was loaded from the cache
//     if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/Registration') {
//       // Redirect the user to the homepage
//       window.location.href = '/sepRegistration';
//     }
//   });

//   window.addEventListener('pageshow', function(event) {
//     // Check if the current page is the dashboard page and was loaded from the cache
//     if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/voterId2') {
//       // Redirect the user to the homepage
//       window.location.href = '/VoterLogin';
//     }
//   });