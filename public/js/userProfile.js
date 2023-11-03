if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
};

async function ready() {

    const userFetch = await fetch('/api/user/profile');
    const userResponse = await userFetch.json();
    const user = userResponse.data;

    profileRendering(user);

    ordersRendering(user);

    // creating the inputs takes time so we create and event to communicate we are done with them
    const event = new Event('userInputsLoaded');
    document.dispatchEvent(event);
};

const profileRendering = (user) => {
    const userImg = document.querySelector('#user-img-container');
    const userImgForm = document.querySelector('#form-img');
    const userTitle = document.querySelector('#user-title-container');
    const userName = document.querySelector('#user-name-container');
    const userEmail = document.querySelector('#user-email-container');
    const userPhone = document.querySelector('#user-phone-container');
    const userAddress = document.querySelector('#user-address-container');
    const userBirth = document.querySelector('#user-birth-container');
    const oldPassword = document.querySelector('#old-password');
    const newPassword = document.querySelector('#new-password');
    const confirmedPassword = document.querySelector('#confirmed-password');
    const productList = document.querySelector('#v-pills-tab');
    
    userImg.innerHTML += `<img src="../img/users/${ user.imagen || 'defaultProfilePhoto.jpeg'}" alt="Image" class="shadow"></img>`;
    userTitle.innerHTML += `${ user.nombre }`;
    userName.innerHTML += `<input type="text" class="form-control" id="user-name" value="${ user.nombre }" name='name' > <div class="invalid-feedback">El nombre debe tener entre 2 y 30 caracteres</div>`;
    userEmail.innerHTML += `<input type="text" class="form-control" id="user-email" value="${ user.email }" name='email' > <div class="invalid-feedback">Debes introducir un email válido</div>`;
    userPhone.innerHTML += `<input type="text" class="form-control" id="user-phone" value="${ user.telefono || "" }" name="phone"> <div class="invalid-feedback">Debes introducir un número válido</div>`;
    userAddress.innerHTML += `<input type="text" class="form-control" id="user-address" value="${ user.direccion || "" }" name="address"> <div class="invalid-feedback"></div>`;
    userBirth.innerHTML += `<input type="date" class="form-control" id="user-birth" value="${ user['fecha-nacimiento'] || "" }" name="birth"> <div class="invalid-feedback">El campo debe ser una fecha válida</div>`;
    userImgForm.innerHTML += `<div class="invalid-feedback">Las extensiones validas son .jpg .img .png .jepg .gif</div>`;

    oldPassword.insertAdjacentHTML('afterend', `<div class="invalid-feedback">Introduce tu contraseña actual</div>`);
    newPassword.insertAdjacentHTML('afterend', `<div class="invalid-feedback">La contraseña debe incluir mínimo 8 caracteres</div>`);
    confirmedPassword.insertAdjacentHTML('afterend', `<div class="invalid-feedback">La contraseña debe ser la misma en ambos campos</div>`);

    if(user['roles-fk'] == 2) {
        productList.innerHTML += `<button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                                <i class="text-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box2-heart-fill" viewBox="0 0 16 16">
                                <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1v3ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
                              </svg></i><a href="/product/list"> Lista de productos</a>
                                </button>`;
    };
};

const ordersRendering =  (user) => {
    const ordersContainer = document.querySelector('#accordionFlushExample');
    const orderList = document.querySelector('#v-pills-settings');
    const profileList = document.querySelector('#v-pills-profile');

    moment.locale('es');

    const showLastOrder = localStorage.getItem('goToOrder');

    if (showLastOrder) {
        profileList.classList.remove('active', 'show');
        orderList.classList.add('active', 'show');
    };

    user.bill.forEach((bill, i) => {

        return ordersContainer.innerHTML += `
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-heading-${i}">
                                    <button class="accordion-button ${showLastOrder && i === (user.bill.length - 1) ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${i}" aria-expanded="false" aria-controls="flush-collapse-${i}">
                                    Pedido ID: ${bill.id}
                                    </button>
                                </h2>
                                <div id="flush-collapse-${i}" class="accordion-collapse collapse ${showLastOrder && i === (user.bill.length - 1) ? 'show' : ''}" aria-labelledby="flush-heading-${i}" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <div class="row">

                                            <div class="date col-md-12 mb-2 mt-2">
                                                <div class="form-group" >
                                                    <p>Fecha de compra: ${moment(bill['created-at']).calendar()}</p>
                                                </div>
                                            </div>
                
                                            ${bill.product.reduce((acc, product) => {

                                                return acc += ` <div class="col-md-4 detalle-productos mb-2 mt-2">
                                                            <div class="form-group" >
                                                                <p><a href="/product/detail/${product.productGroup.id}-${product.id}">${product.productGroup.nombre}</a></p>
                                                            </div>
                                                        </div>
                                
                                                        <div class="col-md-4 cantidad-producto mb-2 mt-2">
                                                            <div class="form-group" >
                                                                <p>Cantidad: ${product.FacturaProducto.cantidad}</p>
                                                            </div>
                                                        </div>
                                
                                                        <div class="col-md-4 precio-producto mb-2 mt-2">
                                                            <div class="form-group">
                                                                <p>$${product.precio}</p>
                                                            </div>
                                                        </div>`
                                            }, '')}

                                            <div class="col-md-6 total-factura mb-2 mt-2">
                                                <div class="form-group">
                                                    <h6>Envio:</h6>
                                                </div>
                                            </div>
                                            
                                            <div class="col-md-6 precio-total-factura mb-2 mt-2">
                                                <div class="form-group">
                                                    <h6>$${bill.envio}</h6>
                                                </div>
                                            </div>
                    
                                            <div class="col-md-6 total-factura mb-2 mt-2">
                                                <div class="form-group">
                                                    <h4>TOTAL FACTURA:</h4>
                                                </div>
                                            </div>
                                            
                                            <div class="col-md-6 precio-total-factura mb-2 mt-2">
                                                <div class="form-group">
                                                    <h4>$${bill.total}</h4>
                                                </div>
                                            </div>
                            
                                        </div>
                                    </div>
                                </div>
                            </div>`
    });

    localStorage.removeItem('goToOrder');
};