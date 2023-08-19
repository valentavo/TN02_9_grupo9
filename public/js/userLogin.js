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
        
        if(email.value.length == 0 || password.value.length == 0) {
            errorContainer.innerHTML = 'Usuario o contraseña inválidos';
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
                errorContainer.innerHTML = user.data;
            };
        };
    });
};