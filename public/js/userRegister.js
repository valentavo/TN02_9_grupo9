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
    const span = document.querySelector('#terms-popover')

    const termsPopover = new bootstrap.Popover(span);

        // Validations 
    userName.addEventListener('blur', () => {
        if(userName.value.length > 0) {
            userName.classList.remove('is-invalid');
        }
        // else {
        //     userName.classList.add('is-invalid');
        // };
    });

    userEmail.addEventListener('blur', () => {
        if(userEmail.value.length > 0) {
            userEmail.classList.remove('is-invalid');
        }
        // else {
        //     userEmail.classList.add('is-invalid');
        // }
    });

    userPassword.addEventListener('blur', () => {
        if(userPassword.value.length > 0) {
            userPassword.classList.remove('is-invalid');
        }
        // else {
        //     userPassword.classList.add('is-invalid');
        // }
    });

    userPasswordConfirmed.addEventListener('blur', () => {
        if(userPasswordConfirmed.value == userPassword.value) {
            userPasswordConfirmed.classList.remove('is-invalid');
        }
        // else {
        //     userPasswordConfirmed.classList.add('is-invalid');
        // }
    });

    termsConditions.addEventListener('click', () => {
        termsPopover.hide();
    })

    button.addEventListener('click', async () => {

            //Validations
        if((userName.value.length < 2 || userName.value.length > 30) && !userName.classList.contains('is-invalid')) {
            userName.classList.add('is-invalid');
        };

        //Regex Email Validation
        const reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        if(!userEmail.classList.contains('is-invalid') && userEmail.value.search(reg) != 0) {
            userEmail.classList.add('is-invalid');
        };

        if(userPassword.value.length < 8 && !userPassword.classList.contains('is-invalid')) {
            userPassword.classList.add('is-invalid');
        };

        if(userPasswordConfirmed.value != userPassword.value && !userPasswordConfirmed.classList.contains('is-invalid')) {
            userPasswordConfirmed.classList.add('is-invalid');
        };

        const inputs = [userName, userEmail, userPassword, userPasswordConfirmed];
        const errors = inputs.filter(input => input.classList.contains('is-invalid'));

        if(!termsConditions.checked) {
        
            errors.push(termsConditions);
            termsPopover.show();
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
            } 

            else if(user.data.find(row => row.msg == 'Este correo ya está en uso')) {

                 await Swal.fire({
                    icon: 'error',
                    title: 'Este correo ya está en uso',
                    showConfirmButton: false,
                    timer: 2000,
                    position: 'center',
                    showClass: {
                        popup: 'animate__animated animate__bounceIn',
                    },
                    hideClass: {
                        popup: 'animate__animated animate__bounceOut' 
                    },
                    width: '25em'
                });
            }
            
            else {
                
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