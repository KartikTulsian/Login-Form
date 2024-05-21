// document.addEventListener('DOMContentLoaded', function() {
const form1 = document.getElementById('form1');


//form1 fields
const user = document.getElementById('username');
const phone = document.getElementById('number');
const email = document.getElementById('email_id');
const pass = document.getElementById('password');
const cpass = document.getElementById('cpass');


// Event listeners for form submission and input changes
form1.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs1();
});

const inputFields1 = [user, phone, email, pass, cpass];
inputFields1.forEach(input => {
    input.addEventListener('change', () => validateInput1(input));
});


const validateInput1 = element => {
    const value = element.value.trim();
    switch(element.id) {
        case 'username':
            if (value === '') {
                setError(element, 'Username is required');
            } else if (value.length < 5) {
                setError(element, 'Name must not be less than 5 characters');
            } else {
                setSuccess(element);
            }
            break;
        case 'number':
            if (value === '') {
                setError(element, 'Phone number is required');
            } else if (value === '123456789' || value.length !== 10 || !/^\d{10}$/.test(value)) {
                setError(element, 'Phone Number must be a 10-digit number and not "123456789"');
            } else {
                setSuccess(element);
            }
            break;
        case 'email_id':
            if (value === '') {
                setError(element, 'Email is required');
            } else if (!isValidEmail(value)) {
                setError(element, 'Provide a valid email address');
            } else {
                setSuccess(element);
            }
            break;
        case 'password':
            if (value === '') {
                setError(element, 'Password is required');
            } else if (value.length < 8) {
                setError(element, 'Password must be at least 8 characters long');
            } else if (value.length > 15) {
                setError(element, 'Password must be at most 15 characters long');
            } else if (value.toLowerCase() === 'password' || value.toLowerCase() === user.value.toLowerCase()) {
                setError(element, 'Password cannot be "password" or the username');
            } else {
                setSuccess(element);
                checkstrength('password');
            }
            break;
        case 'cpass':
            const passValue = pass.value.trim();
            const cpassValue = value;
            if (cpassValue === '' && passValue !== '') {
                setError(element, 'Please confirm your password');
            } else if (cpassValue !== passValue) {
                setError(element, "Passwords don't match");
            } else if (passValue.length < 8) {
                if (cpassValue === passValue) {
                    setError(element, 'Password must be at least 8 characters long');
                } else if (cpassValue !== passValue && cpassValue !== '') {
                    setError(element, 'Password must be at least 8 characters long');
                }
            } else {
                setSuccess(element);
            }
            break;
        default:
            break;
    }
}

const strength = { 1: "very Weak", 2: "Weak", 3: "Meduim", 4: "Strong" };

function checkstrength(passId) {
    const pass = document.getElementById(passId);
    if (!pass) {
        console.error("Password input element not found with id: " + passId);
        return;
    }

    let count = 0;
    let check1 = /[a-z]/;
    if (check1.test(pass.value))
        count++;
    let check2 = /[A-Z]/;
    if (check2.test(pass.value))
        count++;
    let check3 = /\d/;
    if (check3.test(pass.value))
        count++;
    let check4 = /[!@#$%^&*.?]/;
    if (check4.test(pass.value))
        count++;

    const strengthDisp = document.getElementById(passId + "-strength");
    if (!strengthDisp) {
        console.error("Strength display element not found with id: " + passId + "-strength");
        return;
    }

    strengthDisp.innerText = "Password is " + strength[count];
    strengthDisp.classList.add("show-strength");

}




const validateInputs1 = () => {
    let isValid = true;
    inputFields1.forEach(input => {
        validateInput1(input);
        if (input.parentElement.classList.contains('error')) {
            isValid = false;
        }
    });

    if (isValid) {
        alert('Form submitted successfully');
        form1.submit();
    }
};


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
// });


