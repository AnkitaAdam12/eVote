const form = document.querySelector("form"),
        submit = document.querySelector(".submit"),
        allInput = form.querySelectorAll(".first input");

        const voterId = document.getElementById('otp');

        // const pwdReg = /^(?!.*\s)[\w\d\W]{8,20}$/;    
        const otpFormat = /^\d{4}$/;


// code to display next content

// validations on submit button onclick
function submitForm(){
    flag1 = checkSubmit();
    if (flag1 == true) {

        // console.log(flag1)
        send();
        // alert("OTP VALIDATED!");
    }
}


function checkSubmit() {
	// trim to remove the whitespaces
    const otpValue = otp.value.trim();
    let flag = true;
	
	if(otpValue === '') {
        console.log("Enter OTP")
        flag = false;
        setErrorFor(otp, 'Enter OTP');
	}else if(!otpFormat.test(otpValue)){
        console.log("Invalid OTP")
        flag = false;
        setErrorFor(otp, "Invalid OTP");
    } 
    else {
		setSuccessFor(otp);
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
function send() {
    document.getElementById("ss").submit();
}

