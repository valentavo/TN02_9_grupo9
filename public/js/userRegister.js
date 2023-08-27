if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
};

// const Swal = require('sweetalert2');

async function ready() {
    const userName = document.querySelector('#user-name');
    const userEmail = document.querySelector('#user-email');
    const userPassword = document.querySelector('#user-password');
    const userPasswordConfirmed = document.querySelector('#user-password-confirmed');
    const button = document.querySelector('#submit-button');
    const termsConditions = document.querySelector('#terms-conditions');
    const termsError = document.querySelector('#terms-error');

        // Validations 
    userName.addEventListener('blur', () => {
        if(userName.value.length > 0) {
            userName.classList.remove('inputError');
        }else {
            userName.classList.add('inputError');
        };
    });

    userEmail.addEventListener('blur', () => {
        if(userEmail.value.length > 0) {
            userEmail.classList.remove('inputError');
        }else {
            userEmail.classList.add('inputError');
        }
    });

    userPassword.addEventListener('blur', () => {
        if(userPassword.value.length > 0) {
            userPassword.classList.remove('inputError');
        }else {
            userPassword.classList.add('inputError');
        }
    });

    userPasswordConfirmed.addEventListener('blur', () => {
        if(userPasswordConfirmed.value == userPassword.value) {
            userPasswordConfirmed.classList.remove('inputError');
        }else {
            userPasswordConfirmed.classList.add('inputError');
        }
    });

    button.addEventListener('click', async () => {

        termsError.innerHTML = '';

            //Validations
        if(userName.value.length < 2 && !userName.classList.contains('inputError')) {
            userName.classList.add('inputError');
        };

        //Regex Email Validation
        const reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        if(!userEmail.classList.contains('inputError') && userEmail.value.search(reg) != 0) {
            userEmail.classList.add('inputError');
        };

        if(userPassword.value.length < 8 && !userPassword.classList.contains('inputError')) {
            userPassword.classList.add('inputError');
        };

        if(userPasswordConfirmed.value != userPassword.value && !userPasswordConfirmed.classList.contains('inputError')) {
            userPasswordConfirmed.classList.add('inputError');
        };

        const inputs = [userName, userEmail, userPassword, userPasswordConfirmed];
        const errors = inputs.filter(input => input.classList.contains('inputError'));

        if(!termsConditions.checked) {
        
            errors.push(termsConditions);
            termsError.innerHTML = 'debes seleccionar este campo para continuar';
        };

        if(errors.length == 0) {

            const data = {
                name: userName.value,
                email: userEmail.value,
                password: userPasswordConfirmed.value
            };

            const userFetch = await fetch('/api/user/create', {method: 'POST', headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)});
            const user = await userFetch.json();

            if(user.meta.success) {

                await Swal.fire({
                    icon: 'success',
                    title: 'Usuario Registrado',
                    showConfirmButton: false,
                    timer: 1300
                });
                window.location.href = '/user/profile';
            } else {
                
                await Swal.fire({
                    icon: 'error',
                    title: 'Revisa que los campos esten correctos',
                    showConfirmButton: false,
                    timer: 1500,
                    position: 'top-right',
                    showClass: {
                        popup: 'animate__animated animate__bounceIn',
                    },
                    hideClass: {
                        popup: 'animate__animated animate__backOutRight' 
                    },
                    width: '25em'
                });
            };
        };
    });
};