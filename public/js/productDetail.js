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
    const productAccordionDescIng = document.querySelector('#accordion-desc-ing');
    const relatedProducts = document.querySelector('#related-products');

    const currentPath = window.location.pathname;
    const idProduct = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const data = {id: idProduct};

    const productFetch = await fetch('/api/product/detail', {method: 'POST', headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)});
    const info = await productFetch.json();
    const product = info.data.detail

    product.image.forEach( (img, i) => {

        productImage.innerHTML += `
                            <div class="carousel-item ${i == 0 ? 'active': ''}">
                                <img src="../../img/productos/${img.nombre}" class="d-block w-100 pic" alt="${img.nombre}">
                            </div>`;
    });

    productName.innerHTML = product.nombre;
    productPrice.innerHTML = `$${product.precio}`;

    if(product.color.length != 0) {

        let colorOptions = '';

        product.color.forEach( color => {
            colorOptions += `<option value='${ color.id }'>${ color.nombre }</option>`;
        });

        productPrice.insertAdjacentHTML('afterend', `
                    <label for="color" class="text-muted productSize mt-2 mb-2">Color:</label>
                    <select class="form-select" name="color" id="color">${colorOptions}</select>`);
    };

    if(product.size.length != 0) {

        let sizeOptions = '';

        product.size.forEach( size => {
            sizeOptions += `<option value='${ size.id }'>${ size.medida }</option>`;
        });

        productPrice.insertAdjacentHTML('afterend', `
                    <label for="size" class="text-muted productSize mt-2 mb-2">Medidas:</label>
                    <select class="form-select" name="size" id="size">${sizeOptions}</select>`);
    };

    productDesc.innerHTML = `${product.detalle}`;
    product.ingredientes ? productAccordionDescIng.innerHTML += `
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false">
                    <strong>Ingredientes</strong>
                </button>
            </h2>

            <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo">
                <div class="accordion-body">${product.ingredientes}</div>
            </div>
        </div>` : '';

    relatedProducts.innerHTML += info.data.related.reduce((acc, row) => { 
        
       return acc += `<div class="col-lg-3 ">
                        <div class="card p-2">
                            <div class="card-body">
                                <div class="star">

                                </div>
                                <a href="#"><img src="../../img/productos/${row.image[0].nombre}" class="img-fluid pb-3" alt=""></a>
                                <h4 class="productNameH">${row.nombre}</h4>
                                <p class="productSizeH">2 x 454g / 160oz</p>
                                <h4 class="productPriceH">$${row.precio}</h4>
                                <button class="btnc my-4 productCartBtn"><a class="link-detail-btn" href="/product/detail/${row.id}">Detalle</a></button>

                            </div>
                        </div>
                    </div>`
    }, '');

    const event = new Event('detailProductLoaded');
    document.dispatchEvent(event);

};