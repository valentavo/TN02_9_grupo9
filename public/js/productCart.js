if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
};

const shipmentPrice = 1500;

function ready() {

    renderCartProducts();
};

function eliminarProducto(id) {
    const cartProducts = JSON.parse(localStorage.getItem('carrito'));
    localStorage.setItem('carrito', JSON.stringify(cartProducts.filter(row => row.id != id)));
    renderCartProducts();
};

function agergarCantidad (id) {

    const cartProducts = JSON.parse(localStorage.getItem('carrito'));
    cartProducts.find(row => row.id == id).cantidad += 1;
    localStorage.setItem('carrito', JSON.stringify(cartProducts));
    renderCartProducts();

};

function disminuirCantidad (id) {

    const cartProducts = JSON.parse(localStorage.getItem('carrito'));
    const currentProduct = cartProducts.find(row => row.id == id);

    if (currentProduct.cantidad == 1) return;

    currentProduct.cantidad -= 1;
    localStorage.setItem('carrito', JSON.stringify(cartProducts));
    renderCartProducts();

};

async function pagar () {

    const cartProducts = JSON.parse(localStorage.getItem('carrito'));

    const data = {
        shipment: shipmentPrice,
        method: document.querySelector('#payment-method').value,
        prod: cartProducts
    };

    const invoiceFetch = await fetch('/api/product/cart', {method: 'POST', headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)});
    const invoice = await invoiceFetch.json();

    if(invoice.meta.success) {

        await Swal.fire({
            icon: 'success',
            title: 'Compra Realizada',
            text: 'Disfruta tu producto',
            showConfirmButton: true
        });
        
        localStorage.removeItem('carrito');
        localStorage.setItem('goToOrder', true);
        window.location.href = '/user/profile';
    }
    else {
        if(invoice && invoice.meta && invoice.meta.msg) {

            await Swal.fire({
                icon: 'error',
                title: invoice.meta.title,
                text: invoice.meta.msg,
                showConfirmButton: true
            });

            if(invoice.meta.title == 'Usuario inválido') window.location.href = '/user/login';
        }
        else {
            await Swal.fire({
                icon: 'error',
                title: 'Ups!',
                text: 'Parece que algo salió mal, por favor vuelve a intentarlo más tarde',
                showConfirmButton: true
            });
        };
    };
};

function renderCartProducts () {

    const containerCart = document.querySelector('#carrito-container');
    const finalPriceContainer = document.querySelector('#final-price');
    const cartProducts = JSON.parse(localStorage.getItem('carrito')); 
    const emptyCartHTML = `<div class="no-products"><h4>Parece que no has seleccionado ningun producto todavía</h4><a href="/product/list" class="link-cart">Buscar productos</a></div>`;

    if(!cartProducts) {
        localStorage.setItem('carrito', JSON.stringify([]));
        containerCart.innerHTML = emptyCartHTML;
    }
    else {
        if(cartProducts.length == 0) {
            containerCart.innerHTML = emptyCartHTML;
            finalPriceContainer.innerHTML = ``;
        } 
        else {
            let cumulativePrice = 0.00;

            containerCart.innerHTML = ``;

            cartProducts.forEach(row => {

                cumulativePrice += (row.cantidad * row.valor);

                containerCart.innerHTML += `
                    <div class="row mb-5">
                        <!--cart images div--->
                        
                        <div class="col-lg-5 col-sm-11 col-11 mx-auto bg-light d-flex justify-content-center align-items-center shadow">
                            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    ${JSON.parse(row.pic).map((img, i) => {

                                        return `<div class="carousel-item ${i == 0 ? 'active' : ''}">
                                            <img src="/img/productos/${img}" class="d-block w-100" alt="...">
                                        </div>`
                                    })}

                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>

                        <!--cart product details-->

                        <div class="col-lg-7 col-sm-11 col-11 mx-auto px-4 mt-2 mt-lg-5">
                            <div class="row mb-lg-4 me-lg-3 ms-lg-3">
                                <div class="col-lg-8 col-11 mb-lg-2">
                                    <h4 class="mb-4 mt-3 mt-lg-0">${row.titulo}</h4>
                                    ${row.colorName ? `<p class="mb-2 mt-lg-2">Product Color: ${row.colorName}</p>` : ''}
                                    <p class="mb-2 mt-lg-2"><p class="mb-2">Product Size: ${row.medida}</p>
                                </div>
                                <div class="col-lg-4 col-11 mt-4 py=4">
                                    <div class="justify-content-end align-items-center mt-lg-4 mb-lg-2 mb-4">

                                        <button class="agregar-cantidad" id="agregar-cantidad" onclick=agergarCantidad('${row.id}')>+</button>
                                        <span>${row.cantidad}</span>
                                        
                                        <button class="agregar-cantidad" id="disminuir-cantidad" onclick=disminuirCantidad('${row.id}')>-</button>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-lg-4 py-lg-3">
                                <div class="col-lg-9 col-6 d-flex justify-content-between">
                                    <button type="submit" class="btn eliminar_editar mt-2 text-center" onclick=eliminarProducto('${row.id}')><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill me-1" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                        </svg>ELIMINAR PRODUCTO
                                    </button>
                                </div>
                                <div class="col-lg-3 col-6 d-flex justify-content-end">
                                    <p class="mt-3 text-center" id="price_money">$<span id="itemval">${row.cantidad * row.valor}</span></p>
                                </div>

                            </div>

                        </div>
                    </div>`;
            });

            finalPriceContainer.innerHTML =`
                <h2 class="mb-5">TOTAL</h2>
                <div class="price_indiv d-flex justify-content-between">
                    <p>Total productos</p>
                    <p>$<span>${cumulativePrice}</span></p>
                </div>
                <div class="price_indiv d-flex justify-content-between">
                    <p>Total Envío</p>
                    <p>$<span>${shipmentPrice}</span></p>
                </div>
                <div class="price_indiv d-flex justify-content-between">
                    <p>Descuento</p>
                    <p>$<span>0.00</span></p>
                </div>
                <hr/>
                <div class="total-amt d-flex justify-content-between font-weight-bold">
                    <p>Total (Incluye IVA)</p>
                    <p>$<span id="total_cart_amt">${cumulativePrice + shipmentPrice}</span></p>
                </div>
                <div class="payNowContainer"><button class="payNow" onclick='pagar()'>PAGAR AHORA</button></div>`;
        };
    };
};