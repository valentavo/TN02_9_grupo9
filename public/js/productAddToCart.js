document.addEventListener('detailProductLoaded', ready);

function ready () {

    const btnCarrito = document.querySelector('#btn-agregar-carrito');

    btnCarrito.addEventListener('click', () => {

        if (!JSON.parse(localStorage.getItem('carrito'))) {
            localStorage.setItem('carrito', JSON.stringify([]));
            localStorage.setItem('carritoNoti', JSON.stringify(false));
        };

        const currentPath = window.location.href;
        const idReg = currentPath.match(/(\d+)-(\d+)$/);
        console.log(`EL PRODUCTO AGREGADO ES EL ${idReg[2]}`);

        const pics = [];

        document.querySelectorAll('.pic').forEach( pic => pics.push(pic.alt));

        const color = document.querySelector('#color');
        const medida = document.querySelector('#size');
        const title = document.querySelector('#product-name');
        const amount = document.querySelector('#product-price');
        const desc = document.querySelector('#product-description');
        const currentQuantity = document.querySelector('#quantity');

        const currentProduct = {
            id: idReg[2],
            pic: JSON.stringify(pics),
            titulo: title.innerText,
            valor: parseInt(amount.innerText.slice(1)),
            descripcion: desc.innerText,
            colorName: color ? color.options[color.selectedIndex].text : null,
            medida: medida.options[medida.selectedIndex].text
        };

        const cartProducts = JSON.parse(localStorage.getItem('carrito'));

        if(cartProducts.length == 0) {
            currentProduct.cantidad = parseInt(currentQuantity.value);
            cartProducts.push(currentProduct);
        }
        else{
            const productFound = cartProducts.find(product => (product.id == currentProduct.id));

            if (productFound) {
                productFound.cantidad += parseInt(currentQuantity.value);
            }
            else {
                currentProduct.cantidad = parseInt(currentQuantity.value);
                cartProducts.push(currentProduct);
            };
        };
        localStorage.setItem('carrito', JSON.stringify(cartProducts));
        localStorage.setItem('carritoNoti', JSON.stringify(true));

        //Adding the notification of unread messages to cart Icon
        const cartNotification = document.querySelector('#cart-notification');
        cartNotification.classList.remove('visually-hidden');

        Toastify({

            text: "Producto Agregado al Carrito",
            duration: 2000,
            close: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            },
            gravity: "bottom",
            position: "right"

        }).showToast();
    });
};