const form = document.querySelector("form"),
        submit = document.querySelector(".submit"),
        allInput = form.querySelectorAll(".first input");

        // for elements
        // const fname = document.getElementById('name');
        // const dob = document.getElementById('dob');
        // const phno = document.getElementById('phno');
        // const aadhar = document.getElementById('aadhar');
        // const email = document.getElementById('email');
        const otp = document.getElementById('otp');
        // const photo = document.getElementById('picture');
        // const photo = document.querySelector("input[type='file']");
        // console.log(photo)
        // const pwd1 = document.getElementById('pwd1');
        // const pwd2 = document.getElementById('pwd2');

        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phnoReg = /^[7-9]{1}[0-9]{9}$/;
        const pwdReg = /^(?!.*\s)[\w\d\W]{8,20}$/;    
        const aadharReg = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;


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
form.addEventListener("submit", e => {
    e.preventDefault();
});

// validations on submit button onclick
function submitOtp(){
    if(checkSubmit()){
        send();
        // alert("OTP VALIDATED!");
    }
}


function checkSubmit() {
	// trim to remove the whitespaces
	// const nameValue = fname.value.trim();
	// const dobValue = dob.value.trim();
	// const phnoValue = phno.value.trim();
    // const aadharValue = aadhar.value.trim();
    // const emailValue = email.value.trim();
    const otpValue = otp.value.trim();
    console.log(otpValue.length);
    let flag = true;
	
	

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

    if(otpValue===null || otpValue==""){
        setErrorFor(otp,"enter otp");
        flag=false

    }else if(parseInt(otpValue)<=0){
        setErrorFor(otp,"invalid otp");
        flag=false
    }else if(otpValue.length != 4){
        setErrorFor(otp,"invalid otp");
        flag=false
    }else{
        setSuccessFor(otp);
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

function send(){
    document.getElementById("vdotp").submit();
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
//     if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/ValidateOtp') {
//       // Redirect the user to the homepage
//       window.location.href = '/sepRegistration';
//     }
//   });
