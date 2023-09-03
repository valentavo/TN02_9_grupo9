if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}
async function ready() {

    const productsContainer = document.querySelector('#products-container');
    const categoryList = document.querySelector('#category-list');
    const brandList = document.querySelector('#brand-list');

    const productsFetch = await fetch('/api/product/list');
    const products = await productsFetch.json();

    document.querySelectorAll('.spinner').forEach(row => row.setAttribute('hidden', ''));

    let showProducts = function(arr){

        productsContainer.innerHTML = "";

        arr.forEach( (product, k) => {

            return productsContainer.innerHTML += 
            `
            <div class="card col mb-4 col-lg-4 col-md-6 col-sm-12 col-12">
                <div id="carouselExampleFade-${k}" class="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div class="carousel-inner" id="img-product-carousel">
                        ${product.image.reduce((acc, img, j) => {
                            return acc + `
                            <div class="carousel-item ${j == 0 ? 'active' : ''}">
                                <img src="../img/productos/${img.nombre}" class="d-block w-100" alt="...">
                            </div>`
                        }, '')}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade-${k}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade-${k}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

                <a href="/product/detail/${product.id}">
                    <h4 class="productNameH mt-3">${product.nombre}</h4>
                </a>
                <p class="productSizeH mt-2">2 x 454g / 160oz</p>
                <h4 class="productPriceH">$${product.precio}</h4>
                <a class="btnc my-4 py-2 px-2 productCartBtn" href=" ${(products.data.user && products.data.user["roles-fk"]=="2" )? `/product/edit/${product.id}` : "/product/cart"}"> ${(products.data.user && products.data.user["roles-fk"]=="2" )? "Editar producto" : "Agregar al Carrito"} </a>
                
             

            </div>
            `
       
        });

    }
    showProducts(products.data.products);

    products.data.categories.forEach((category, y)  => {

        categoryList.innerHTML +=
        `<li><button type="button" id="category-${y}">${category.nombre}</button></li>
        `;
    });

    products.data.categories.forEach((category, i) => {
        const elem = document.querySelector(`#category-${i}`);

        elem.addEventListener('click', () => {

            let data = products.data.products
            let dataFiltered = data.filter(row => {
                return row['categorias-fk'] == category.id
            });

            showProducts(dataFiltered);
        });
    });

    products.data.brands.forEach((brand, y)  => {

        return brandList.innerHTML +=
        `<li><button type="button" id="brand-${y}">${brand.nombre}</button></li>
        `
    });

    products.data.brands.forEach((brand, i) => {
        const elem = document.querySelector(`#brand-${i}`);

        elem.addEventListener('click', () => {

            let data = products.data.products
            let dataFiltered = data.filter(row => {
                return row['marcas-fk'] == brand.id
            });

            showProducts(dataFiltered);
        });
    });

    /*function filterCategory(id){
        console.log('hola');
        let data = products.data.products
        let dataFiltered = data.filter(row => {
            return row.id == id 
        });
        showProducts(dataFiltered);
    };*/

}


