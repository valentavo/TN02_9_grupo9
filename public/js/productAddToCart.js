document.addEventListener('detailProductLoaded', ready);

function ready () {

    const btnCarrito = document.querySelector('#btn-agregar-carrito');

    btnCarrito.addEventListener('click', () => {

        if (!JSON.parse(localStorage.getItem('carrito'))) {
            localStorage.setItem('carrito', JSON.stringify([]));
        };

        const currentPath = window.location.href;
        const idReg = /\/product\/detail\/(\d+)/;

        const pics = [];

        document.querySelectorAll('.pic').forEach( pic => pics.push(pic.alt))

        const currentProduct = {
            id: currentPath.match(idReg)[1],
            pic: JSON.stringify(pics),
            titulo: document.querySelector('#product-name').innerText,
            valor: parseInt(document.querySelector('#product-price').innerText),
            descripcion: document.querySelector('#product-description').innerText,
            color: document.querySelector('#color') ? document.querySelector('#color').value : null,
            medida: document.querySelector('#size') ? document.querySelector('#size').innerText : null
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
        // console.log(JSON.parse(JSON.parse(localStorage.getItem('carrito'))[0].pic));
    });
};