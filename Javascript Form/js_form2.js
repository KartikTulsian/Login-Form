const form2 = document.getElementById('form2');

const user = document.getElementById('username');
const phone = document.getElementById('number');
const email = document.getElementById('email_id');
const pass = document.getElementById('password');

//sign in page
form2.addEventListener('submit', e => {
    e.preventDefault();
    if (validateInputs2()) {
        window.location.href="index_form.html";
    }
})

const inputFields2 = [user, phone, email, pass];
inputFields2.forEach(input => {
    input.addEventListener('change', () => validateInput2(input));
});

const validateInput2 = element => {
    const value = element.value.trim();
    switch(element.id) {
        case 'username':
            if (value === '') {
                setError(element, 'Enter the registered Username');
            } else if (value.length < 5) {
                setError(element, 'Name must not be less than 5 characters');
            } else {
                setSuccess(element);
            }
            break;
        case 'number':
            if (value === '') {
                setError(element, 'Enter the registered Phone number');
            } else if (value === '123456789' || value.length !== 10 || !/^\d{10}$/.test(value)) {
                setError(element, 'Phone Number must be a 10-digit number and not "123456789"');
            } else {
                setSuccess(element);
            }
            break;
        case 'email_id':
            if (value === '') {
                setError(element, 'enter the registered Email');
            } else if (!isValidEmail(value)) {
                setError(element, 'Provide a valid email address');
            } else {
                setSuccess(element);
            }
            break;
        case 'password':
            if (value === '') {
                setError(element, 'Enter the correct Password');
            } else if (value.length < 8) {
                setError(element, 'Password must be at least 8 characters long');
            } else if (value.toLowerCase() === 'password' || value.toLowerCase() === user.value.toLowerCase()) {
                setError(element, 'Password cannot be "password" or the username');
            } else {
                setSuccess(element);
            }
            break;
        default:
            break;
    }
}

const validateInputs2 = () => {
    let isValid = true;
    inputFields2.forEach(input => {
        validateInput2(input);
        if (input.parentElement.classList.contains('error')) {
            isValid = false;
        }
    });

    if (isValid) {
        alert('Signed In Successfully');
        form2.submit();
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