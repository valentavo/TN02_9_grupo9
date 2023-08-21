
document.addEventListener("userInputsLoaded", ready);

function ready() {
    const userName = document.querySelector('#user-name');
    const userEmail = document.querySelector('#user-email');
    const userPhone = document.querySelector('#user-phone');
    const userAddress = document.querySelector('#user-address');
    const userImage = document.querySelector('#user-image');
    const userBirth = document.querySelector('#user-birth');
    const button = document.querySelector('#save-user');


    // Disabling update system
    const nameValue = userName.value;
    const emailValue = userEmail.value;
    const phoneValue = userPhone.value;
    const addressValue = userAddress.value;
    const imageValue = userImage.value;
    const birthValue = userBirth.value;

    const inputsUpdate = () => {
        return userName.value == nameValue && userEmail.value == emailValue && userPhone.value == phoneValue && userAddress.value == addressValue && userImage.value == imageValue && userBirth.value == birthValue
    };

    const extAllowed = ['.png', '.jpeg', '.jpg', '.img'];

    userName.addEventListener('blur', () => {
        if(userName.value != nameValue){
            button.removeAttribute('disabled');
        }
        else if (inputsUpdate()) {
            button.setAttribute('disabled', true);
        };
        userName.classList.remove('inputError');
    });
    userEmail.addEventListener('blur', () => {
        if(userEmail.value != emailValue){
            button.removeAttribute('disabled');
        }
        else if (inputsUpdate()) {
            button.setAttribute('disabled', true);
        };
        userEmail.classList.remove('inputError');
    });
    userPhone.addEventListener('blur', () => {
        if(userPhone.value != phoneValue){
            button.removeAttribute('disabled');
        }
        else if (inputsUpdate()) {
            button.setAttribute('disabled', true);
        };
        userPhone.classList.remove('inputError');
    });
    userAddress.addEventListener('blur', () => {
        if(userAddress.value != addressValue){
            button.removeAttribute('disabled');
        }
        else if (inputsUpdate()) {
            button.setAttribute('disabled', true);
        };
        userAddress.classList.remove('inputError');
    });
    userBirth.addEventListener('blur', () => {
        if(userBirth.value != birthValue){
            button.removeAttribute('disabled');
        }
        else if (inputsUpdate()) {
            button.setAttribute('disabled', true);
        };
        userBirth.classList.remove('inputError');
    });

    userImage.addEventListener('blur', () => {
        if(userImage.value != imageValue){
            button.removeAttribute('disabled');
        }
        else if (inputsUpdate()) {
            button.setAttribute('disabled', true);
        };
        userImage.classList.remove('inputError');
    });

    // Validations
    button.addEventListener('click', async () => {

        if(userName.value.length == 0) {
            userName.classList.add('inputError');
        };

        if(userEmail.value.length == 0) {
            userEmail.classList.add('inputError');
        };

        if(userPhone.value.length > 16 && userPhone.value.length < 6) {
            userPhone.classList.add('inputError');
        };

        if((Date.parse(new Date(userBirth.value)) > Date.now())) {
            userBirth.classList.add('inputError');
        };

        if(userImage.value != "") {
            if(!extAllowed.find( row => userImage.value.includes(row))){
                
                userImage.classList.add('inputError');
            };
        };

        const inputs = [userName, userEmail, userPhone, userAddress, userImage, userBirth];
        const errors = inputs.filter(input => input.classList.contains('inputError'));

        if(errors.length == 0) {

            const data = {
                name: userName.value,
                email: userEmail.value,
                birth: userBirth.value || null,
                phone: userPhone.value,
                address: userAddress.value,
            };

            const userFetch = await fetch('/api/user/edit', {method: 'PUT', headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)});
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
            else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: 'Parece que algo salió mal, porfavor vuelve a intentarlo más tarde',
                    showConfirmButton: true
                });
            }
        }
    });
};