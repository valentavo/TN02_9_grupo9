if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
};

async function ready() {
    const userImg = document.querySelector('#user-img-container');
    const userTitle = document.querySelector('#user-title-container');
    const userName = document.querySelector('#user-name-container');
    const userEmail = document.querySelector('#user-email-container');
    const userPhone = document.querySelector('#user-phone-container');
    const userAddress = document.querySelector('#user-address-container');
    const userBirth = document.querySelector('#user-birth-container');
    const productList = document.querySelector('#v-pills-tab');

    const userFetch = await fetch('/api/user/profile');
    const userResponse = await userFetch.json();
    const user = userResponse.data;
    
    userImg.innerHTML += `<img src="../img/users/${ user.imagen || 'defaultProfilePhoto.jpeg'}" alt="Image" class="shadow"></img>`;
    userTitle.innerHTML += `${ user.nombre }`;
    userName.innerHTML += `<input type="text" class="form-control" id="user-name" value="${ user.nombre }" name='name' >`;
    userEmail.innerHTML += `<input type="text" class="form-control" id="user-email" value="${ user.email }" name='email' >`;
    userPhone.innerHTML += `<input type="text" class="form-control" id="user-phone" value="${ user.telefono || "" }" name="phone">`;
    userAddress.innerHTML += `<input type="text" class="form-control" id="user-address" value="${ user.direccion || "" }" name="address">`;
    userBirth.innerHTML += `<input type="date" class="form-control" id="user-birth" value="${ user['fecha-nacimiento'] || "" }" name="birth">`

    if(user['roles-fk'] == 2) {
        productList.innerHTML += `<button class="nav-link" type="button">
                                    <a href="/product/list">Lista de productos</a>
                                </button>`;
    };

    // creating the inputs takes time so we create and event to communicate we are done with them
    const event = new Event('userInputsLoaded');
    document.dispatchEvent(event);
}