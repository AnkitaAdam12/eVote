const form = document.querySelector("form"),
        submit = document.querySelector(".submit"),
        allInput = form.querySelectorAll(".first input");

        const username = document.getElementById('uname');
        const pwd2 = document.getElementById('pwd');

        const pwdReg = /^(?!.*\s)[\w\d\W]{8,20}$/;    
        const idFormat = /^[a-zA-Z\s]+$/;

        const passwordInput = document.getElementById("pwd");
        const passwordIcon = document.getElementById("password-icon");


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

// code to display next content

// validations on submit button onclick
function submitForm(){
  flag1=checkSubmit();
  if(flag1==true){
    
      // console.log(flag1)
      send();
      // alert("OTP VALIDATED!");
  }
}


function checkSubmit() {
	// trim to remove the whitespaces
    const userValue = username.value.trim();
    const pwdValue = pwd2.value.trim();
    let flag = true;
	
	if(userValue === '') {
        console.log("Username can't be empty")
        flag = false;
        setErrorFor(username, 'Username cannot be blank');
	}else if(!idFormat.test(userValue)){
        console.log("Invalid Username")
        flag = false;
        setErrorFor(username, "Invalid Username");
    } 
    else {
		setSuccessFor(username);
	}

    if(pwdValue.length == 0 || pwdValue == null || pwdValue == ""){
        console.log("Enter Password")
        flag = false;
        setErrorFor(pwd2, 'Enter Password');
    }else{
        setSuccessFor(pwd2);
    }

    console.log(flag);
    return flag;
}

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

function send(){
  document.getElementById("partylg").submit();
}

// window.addEventListener('pageshow', function(event) {
//   // Check if the current page is the dashboard page and was loaded from the cache
//   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/PartyLogin') {
//     // Redirect the user to the homepage
//     window.location.href = '/';
//   }
// });



