if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}
async function ready() {

    const productsContainerSellers = document.querySelector('.products-container-sellers');
    const productsContainerRecommendations = document.querySelector('.products-container-recommendations');

	const productsFetch = await fetch('/api');
    const productsParsed = await productsFetch.json();
    const products = productsParsed.data;

    document.querySelectorAll('.spinner').forEach(row => row.setAttribute('hidden', ''));

    products.bestSellers.forEach( (product, i) => {

        return productsContainerSellers.innerHTML += 
        `
        <div class="card col mb-4 col-lg-4 col-md-6 col-sm-12 col-12">
            <div id="carouselExampleFade-1-${i}" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner" id="img-product-carousel">
                    ${product.image.reduce((acc, img, j) => {
                        return acc + `
                        <div class="carousel-item ${j == 0 ? 'active' : ''}">
                            <img src="img/productos/${img.nombre}" class="d-block w-100" alt="...">
                        </div>`
                    }, '')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade-1-${i}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade-1-${i}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div class="card-body">
                <a href="/product/detail/${product.product[0].id}">
                    <h4 class="productNameH mt-3">${product.nombre}</h4>
                </a>
                <p class="productSizeH mt-2">2 x 454g / 160oz</p>
                <h4 class="productPriceH">$${product.product[0].precio}</h4>
                <a class="btn my-4 py-3 px-3 productCartBtn h-auto" href="/product/detail/${product.id}"> Detalle </a>
            </div>
        </div>
        
        `
    });

    products.recomendations.forEach( (product, i) => {

        return productsContainerRecommendations.innerHTML += 
        `
        <div class="card col mb-4 col-lg-4 col-md-6 col-sm-12 col-12">
            <div id="carouselExampleFade-0-${i}" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner" id="img-product-carousel">
                    ${product.image.reduce((acc, img, j) => {
                        return acc + `
                        <div class="carousel-item ${j == 0 ? 'active' : ''}">
                            <img src="img/productos/${img.nombre}" class="d-block w-100" alt="...">
                        </div>`
                    }, '')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade-0-${i}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade-0-${i}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div class="card-body">
                <a href="/product/detail/${product.product[0].id}">
                    <h4 class="productNameH mt-3">${product.nombre}</h4>
                </a>
                <p class="productSizeH mt-2">2 x 454g / 160oz</p>
                <h4 class="productPriceH">$${product.product[0].precio}</h4>
                <a class="btn my-4 py-3 px-3 productCartBtn h-auto" href="/product/detail/${product.id}"> Detalle </a>
            </div>
        </div>
        
        `
    });
}; 