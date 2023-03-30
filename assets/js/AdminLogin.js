const form = document.querySelector("form"),
        submit = document.querySelector(".submit"),
        allInput = form.querySelectorAll(".first input");

        const adminUsername = document.getElementById('username');
        const adminPwd = document.getElementById('pwd');

       // const defaultUsername = 'evoting';
       const usernameReg =/^[a-zA-Z]+$/;   
       const defaultPassword = /^(?!.*\s)[\w\d\W]{8,20}$/;

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
    const usernameValue = adminUsername.value.trim();
    const pwdValue = adminPwd.value.trim();
    let flag = true;
	
    //For Username
	if(usernameValue === '') {
        console.log("Username can't be empty")
        flag = false;
        setErrorFor(adminUsername, 'Username cannot be blank');
    }  
    else if(!usernameReg.test(usernameValue)){
        console.log("Invalid Username")
        flag = false;
        setErrorFor(adminUsername, "Invalid Username");
    } 
    else{ 
        setSuccessFor(adminUsername);
	}

    //For Password
    if(pwdValue.length == 0 || pwdValue == null || pwdValue == ""){
        console.log("Enter Password")
        flag = false;
        setErrorFor(adminPwd, 'Enter Password');
    }else{
        setSuccessFor(adminPwd);
    }

    //For Both Username & Password
    // if (usernameReg.test(usernameValue))
    // {
    //     setSuccessFor(adminUsername);
    //     if(pwdValue === defaultPassword && !(pwdValue === '')) 
    //     {         
    //         setSuccessFor(adminPwd);
    //     }
    //     else
    //     {            
    //     }
    // }
    console.log(flag);
    return flag;
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
    document.getElementById("adminlg").submit();
}


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

// window.addEventListener('pageshow', function(event) {
//   // Check if the current page is the dashboard page and was loaded from the cache
//   if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD && window.location.pathname === '/AdminLogin') {
//     // Redirect the user to the homepage
//     window.location.href = '/';
//   }
// });
