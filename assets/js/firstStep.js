const form = document.querySelector("form"),
        submit = document.querySelector(".submit"),
        allInput = form.querySelectorAll(".first input");

        const voterId = document.getElementById('voterId');
        const aadhar = document.getElementById('aadhar');

        // const pwdReg = /^(?!.*\s)[\w\d\W]{8,20}$/;    
        const idFormat = /^\d{6}$/;
        const aadharReg = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;


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
    const voterIdValue = voterId.value.trim();
    const aadharValue = aadhar.value.trim();
    let flag = true;
	
	if(voterIdValue === '') {
        console.log("Id can't be empty")
        flag = false;
        setErrorFor(voterId, 'Id cannot be blank');
	}else if(!idFormat.test(voterIdValue)){
        console.log("Invalid Id")
        flag = false;
        setErrorFor(voterId, "Invalid Id");
    } 
    else {
		setSuccessFor(voterId);
	}

    // if(pwdValue.length == 0 || pwdValue == null || pwdValue == ""){
    //     console.log("Enter Password")
    //     flag = false;
    //     setErrorFor(pwd, 'Enter Password');
    // }else{
    //     setSuccessFor(pwd);
    // }

    if(!aadharReg.test(aadharValue)){
        console.log("Aadhar number is invalid");
        setErrorFor(aadhar, 'Aadhar number is invalid');
        flag = false;
    }else {
		setSuccessFor(aadhar);
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
    document.getElementById("fs").submit();
}
