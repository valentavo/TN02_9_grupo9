if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
};

async function ready() {
    const userImg = document.querySelector('#user-img');
    const userTitle = document.querySelector('#user-title');
    const productList = document.querySelector('#v-pills-tab');
    const userName = document.querySelector('#user-name');
    const userEmail = document.querySelector('#user-email');
    const userPhone = document.querySelector('#user-phone');
    const userAddress = document.querySelector('#user-address');

    const userFetch = await fetch('/api/user/profile');
    const userResponse = await userFetch.json();
    const user = userResponse.data;
    
    userImg.innerHTML += `<img src="../img/users/${ user.imagen || 'defaultProfilePhoto.jpeg'}" alt="Image" class="shadow"></img>`;
    userTitle.innerHTML += `${ user.nombre }`;
    userName.innerHTML += `<input type="text" class="form-control" value="${ user.nombre }" name='name' >`;
    userEmail.innerHTML += `<input type="text" class="form-control" value="${ user.email }" name='email' >`;
    userPhone.innerHTML += `<input type="text" class="form-control" value="${ user.telefono || "" }" name="phone">`;
    userAddress.innerHTML += `<input type="text" class="form-control" value="${ user.direccion || "" }" name="address">`;

    if(user.role == 2) {
        productList.innerHTML += `<button class="nav-link" type="button">
                                    <a href="/product/list">Lista de productos</a>
                                </button>`;
    }
}