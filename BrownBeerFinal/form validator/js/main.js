const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const errstate = formControl.querySelector('small');
    errstate.innerText = `${message}`;
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function validateEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Email is not valid');
    }
}

function checkRequired(inputArr){
    inputArr.forEach( input =>{
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
        }else{
            showSuccess(input);
        }
    })
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

function checkLength(input, min, max){
    const length = input.value.trim().length;
    if(length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters long`);
    }else if(length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters long`);
    }
}

function checkPasswordsMatch(input1,input2){
    if(input1.value !== input2.value){
        showError(input1, `Password does not match`);
        showError(input2,`Password does not match`)
    }
}

form.addEventListener('submit',function(e){
    e.preventDefault();
  
    checkRequired([username,email,password,password2]);
    checkLength(username,4,10);
    checkLength(password,6,10);
    validateEmail(email);
    checkPasswordsMatch(password,password2);
});