if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
};

async function ready() {

    const productImage = document.querySelector('#image-container');
    const productName = document.querySelector('#product-name');
    const productPrice = document.querySelector('#product-price');
    const productDesc = document.querySelector('#product-description');

    const currentPath = window.location.pathname;
    const idProduct = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const data = {id: idProduct};

    const productFetch = await fetch('/api/product/detail', {method: 'POST', headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)});
    const product = await productFetch.json();

    product.data.image.forEach( (img, i) => {

        productImage.innerHTML += `
                            <div class="carousel-item ${i == 0 ? 'active': ''}">
                                <img src="../../img/productos/${img.nombre}" class="d-block w-100" alt="...">
                            </div>`;
    });

    productName.innerHTML = product.data.nombre;
    productPrice.innerHTML = product.data.precio;

    if(product.data.color.length != 0) {

        let colorOptions = '';

        product.data.color.forEach( color => {
            colorOptions += `<option value='${ color.id }'>${ color.nombre }</option>`;
        });

        productPrice.insertAdjacentHTML('afterend', `
                    <label for="color" class="text-muted productSize mt-2 mb-2">Color:</label>
                    <select class="form-select" name="color" id="color">${colorOptions}</select>`);
    };

    if(product.data.size.length != 0) {

        let sizeOptions = '';

        product.data.size.forEach( size => {
            sizeOptions += `<option value='${ size.id }'>${ size.medida }</option>`;
        });

        productPrice.insertAdjacentHTML('afterend', `
                    <label for="size" class="text-muted productSize mt-2 mb-2">Medidas:</label>
                    <select class="form-select" name="size" id="size">${sizeOptions}</select>`);
    };

    productDesc.innerHTML += `${product.data.detalle}`;

};