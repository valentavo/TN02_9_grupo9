if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}
async function ready() {

    const productsContainer = document.querySelectorAll('.products-container');


	const productsFetch = await fetch('/api');
    const products = await productsFetch.json();

    products.data.forEach( product => {
        return productsContainer.forEach( container => {

            return container.innerHTML += 
            `
            <div class="card card-body col-6 col-sm-3 p-2">

                <img src="img/productos/${product.image[0].nombre}" class="img-fluid pb-3" alt="">
                <a href="/product/detail/${product.id}">
                    <h4 class="productNameH">${product.nombre}</h4>
                </a>
                <p class="productSizeH">2 x 454g / 160oz</p>
                <h4 class="productPriceH">$${product.precio}</h4>
                <button class="btnc my-4 productCartBtn"><a href="/product/cart"> Agregar al Carrito </a></button>

            </div>
            `
        })
    })
};