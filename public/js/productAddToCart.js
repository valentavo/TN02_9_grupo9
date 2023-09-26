document.addEventListener('detailProductLoaded', ready);

function ready () {

    const btnCarrito = document.querySelector('#btn-agregar-carrito');

    btnCarrito.addEventListener('click', () => {

        if (!JSON.parse(localStorage.getItem('carrito'))) {
            localStorage.setItem('carrito', JSON.stringify([]));
            localStorage.setItem('carritoNoti', JSON.stringify(false));
        };

        const currentPath = window.location.href;
        const idReg = /\/product\/detail\/(\d+)/;

        const pics = [];

        document.querySelectorAll('.pic').forEach( pic => pics.push(pic.alt));
        const color = document.querySelector('#color');
        const medida = document.querySelector('#size');

        const currentProduct = {
            id: `${currentPath.match(idReg)[1]}-${color ? color.options[color.selectedIndex].text : ''}${medida ? medida.options[medida.selectedIndex].text : ''}`,
            pic: JSON.stringify(pics),
            titulo: document.querySelector('#product-name').innerText,
            valor: parseInt(document.querySelector('#product-price').innerText.slice(1)),
            descripcion: document.querySelector('#product-description').innerText,
            color: color ? color.value : null,
            colorName: color ? color.options[color.selectedIndex].text : null,
            medida: medida ? medida.options[medida.selectedIndex].text : null,
        };

        const cartProducts = JSON.parse(localStorage.getItem('carrito'));

        if(cartProducts.length == 0) {
            currentProduct.cantidad = parseInt(document.querySelector('#quantity').value);
            cartProducts.push(currentProduct);
        }
        else{
            const productFound = cartProducts.find(product => (product.id == currentProduct.id) && (product.color == currentProduct.color) && (product.medida == currentProduct.medida));

            if (productFound) {
                productFound.cantidad += parseInt(document.querySelector('#quantity').value);
            }
            else {
                currentProduct.cantidad = parseInt(document.querySelector('#quantity').value);
                cartProducts.push(currentProduct);
            };
        };
        localStorage.setItem('carrito', JSON.stringify(cartProducts));
        localStorage.setItem('carritoNoti', JSON.stringify(true));

        //Adding the notification of unread messages to cart Icon
        const cartNotification = document.querySelector('#cart-notification');
        JSON.parse(localStorage.getItem('carrito')) ? cartNotification.classList.remove('visually-hidden') : '';

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