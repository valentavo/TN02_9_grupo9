if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}

async function ready() {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const remember = document.querySelector('#remember')
    const button = document.querySelector('#submit-button');
    const errorContainer = document.querySelector('#error-message');

    button.addEventListener('click', async () => {

        //Regex Email Validation
        const reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        //Toast
        const errorMessage = Toastify({

            text: "Usuario o contraseña inválidos",
            duration: 2000,
            close: true,
            style: {
                background: 'red'
            }

        });
        
        if(email.value.search(reg) != 0 || password.value.length == 0) { // regex para validar email
            errorMessage.showToast();
        } else {

            const data = {
                email: email.value,
                password: password.value,
                remember: remember.checked
            };

            const userFetch = await fetch('/api/user/login', {method: 'POST', headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)});
            const user = await userFetch.json();

            if (user.meta.success) {
                window.location.href = '/user/profile';
            }else{
                errorMessage.showToast();
            };
        };
    });
};