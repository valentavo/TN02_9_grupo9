
document.addEventListener("userInputsLoaded", ready);

function ready() {
    const userName = document.querySelector('[name="name"]');
    const userEmail = document.querySelector('#user-email');
    const userPhone = document.querySelector('#user-phone');
    const userAddress = document.querySelector('#user-address');
    const userImage = document.querySelector('#user-image');
    const userBirth = document.querySelector('#user-birth');
    const buttonProfile = document.querySelector('#save-user');
    const buttonPassword = document.querySelector('#save-password');
    // const form = document.querySelector('#form-submit');


    // Disabling update system
    const elements = [
        {
            element: userName,
            value: userName.value
        },
        {
            element: userEmail,
            value: userEmail.value
        },
        {
            element: userPhone,
            value: userPhone.value
        },
        {
            element: userAddress,
            value: userAddress.value
        },
        {
            element: userImage,
            value: userImage.value
        },
        {
            element: userBirth,
            value: userBirth.value
        }
    ];

    const inputsUpdate = () => {

        return elements.filter( row => row.element.value != row.value);
    };

    const extAllowed = ['.png', '.jpeg', '.jpg', '.img', '.gif'];


    elements.forEach( row => {
        row.element.addEventListener('blur', () => {

            if(inputsUpdate().length != 0){
                buttonProfile.removeAttribute('disabled');
            }
            else {
                buttonProfile.setAttribute('disabled', true);
            };
            row.element.classList.remove('is-invalid');
        });

    });

    // Validations
    buttonProfile.addEventListener('click', async () => {

        if(userName.value.length < 2 || userName.value.length > 30) {
            userName.classList.add('is-invalid');
        };

        const reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        if(userEmail.value.length == 0 || userEmail.value.search(reg) != 0) {
            userEmail.classList.add('is-invalid');
        };

        if(userPhone.value.length > 16 || (userPhone.value.length < 6 && userPhone.value.length != 0)) {
            userPhone.classList.add('is-invalid');
        };

        if((Date.parse(new Date(userBirth.value)) > Date.now())) {
            userBirth.classList.add('is-invalid');
        };

        if(userImage.value != "") {
            if(!extAllowed.find( row => userImage.value.includes(row))){
                
                userImage.classList.add('is-invalid');
            };
        };

        const errors = elements.filter(input => input.element.classList.contains('is-invalid'));

        if(errors.length == 0) {

            const formData = new FormData();

            // formData.append('name', document.querySelector('[name="name"]').value);
            elements[1].value != userEmail.value ? formData.append('prevEmail', elements[1].value) : "";
            formData.append('field', 'profile');
            formData.append('name', userName.value);
            userImage.value.length != 0 ? formData.append('img', userImage.files[0]) : '';
            formData.append('email', userEmail.value);
            formData.append('birth', userBirth.value);
            formData.append('phone', userPhone.value);
            formData.append('address', userAddress.value);

            const userFetch = await fetch('/api/user/edit', {method: 'PUT', body: formData});
            const user = await userFetch.json();

            if(user.meta.success) {

                await Swal.fire({
                    icon: 'success',
                    title: 'Modificación exitosa',
                    text: 'Tu usuario ha sido modificado con éxito',
                    showConfirmButton: false,
                    timer: 1300
                });
                location.reload();
            }
            else if(user.data.find(row => row.msg == 'Este correo ya está en uso')) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Este correo ya está en uso',
                    text: 'Introduce otro correo electrónico',
                    showConfirmButton: true
                });
            }
            else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: 'Parece que algo salió mal, porfavor vuelve a intentarlo más tarde',
                    showConfirmButton: true
                });
            };
        };
    });

    buttonPassword.addEventListener('click', async () => {

        const elements = [
            {
                input: document.querySelector('#old-password')
            },
            {
                input: document.querySelector('#new-password')
            },
            {
                input: document.querySelector('#confirmed-password')
            }
        ];

        //validations

        if(elements[0].input.value.length == 0) {
            elements[0].input.classList.add('is-invalid');
        };
        if(elements[1].input.value.length < 8) {
            elements[1].input.classList.add('is-invalid');
        };
        if(elements[2].input.value != elements[1].input.value) {
            elements[2].input.classList.add('is-invalid');
        };

        elements.forEach( row => {
            row.input.addEventListener('blur', () => {
                row.input.classList.remove('is-invalid');
            });
        });

        const errors = elements.filter(element => element.input.classList.contains('is-invalid'));
        if (errors.length == 0) {

            const data = {
                field: 'password',
                oldPassword: elements[0].input.value,
                password: elements[2].input.value
            }

            const passwordFetch = await fetch('/api/user/edit', {method: 'PUT', headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)});
            const password = await passwordFetch.json();

            if (password.meta.success) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Modificación exitosa',
                    text: 'Tu usuario ha sido modificado con éxito',
                    showConfirmButton: false,
                    timer: 1300
                });
                location.reload();
            }
            else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: 'Parece que algo salió mal, porfavor vuelve a intentarlo más tarde',
                    showConfirmButton: true
                });
            }
        };
    });
};

