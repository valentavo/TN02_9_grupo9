if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready()
}

const productsContainer = document.querySelector('#products-container');
const filterTitle = document.querySelector('#filter-title');
let productsFiltered = [];
let allProducts = [];
let selectedBrand = 0;
let selectedCategory = 0;
let userRol = 1;
let titleText = [false, false];

 //Renderizador de productos pertenecientes a lista filtrada
let showProducts = function(arr){

    productsContainer.innerHTML = "";

    arr.forEach( (product, k) => {

        return productsContainer.innerHTML += 
        `
        <div class="card col mb-4 col-lg-4 col-md-12 col-sm-12 col-12">
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

            <div class="card-body">
                <a href="/product/detail/${product.id}">
                    <h4 class="productNameH mt-3">${product.nombre}</h4>
                </a>
                <p class="productSizeH mt-2">2 x 454g / 160oz</p>
                <h4 class="productPriceH">$${product.precio}</h4>
                <a class="btnc my-4 py-2 px-2 productCartBtn" href=" ${( userRol == "2" )? `/product/edit/${product.id}` : `/product/detail/${product.id}`}"> ${( userRol == "2" )? "Editar producto" : "Detalle"} </a>
            </div>
        </div>
        `
    
    });

}

//Agregar Filtro a lista de productos
const addFilter = (type, name) => {

    if(type[1] != 0) {
        productsFiltered = productsFiltered.filter(row => {
            return row[`${type[0]}`] == type[1]
        });
    };

    if(type[0] == 'categorias-fk') {
        selectedCategory = type[1];
        if (type[1] != 0) {
            titleText[0] = name;
        }
        else {
            titleText[0] = false;
        }
    }
    else if (type[0] == 'marcas-fk') {
        selectedBrand = type[1]
        if (type[1] != 0) {
            titleText[1] = name;
        }
        else {
            titleText[1] = false;
        }
    }

    if (titleText[0] || titleText[1]) {

        filterTitle.innerText = (titleText[0] && titleText[1]) ? titleText.join(', ') : titleText[0] || titleText[1];
    }
    else {
        filterTitle.innerText = 'Productos seleccionados';
    }
};

//Reemplazar Filtro a lista de productos
const replaceFilter = (type, name) => {

    const categoryOptions = document.querySelectorAll('.category-filter-option');
    const brandOptions = document.querySelectorAll('.brand-filter-option');

    //Marcas
    if(type[0] == 'categorias-fk') {
        selectedCategory = type[1];

        //Products
        if (type[1] != 0) {
            productsFiltered = allProducts.filter(row => {
                return row[`${type[0]}`] == type[1]
            });
        }
        else {
            productsFiltered = allProducts;
        };

        //Title
        if (type[1] != 0) {
            titleText[0] = name;
        }
        else {
            titleText[0] = false;
        };

        //Other Filters
        if (selectedBrand > 0) productsFiltered = productsFiltered.filter(row => {
            return row[`marcas-fk`] == selectedBrand
        });

        //Category selected
        categoryOptions.forEach(row => {
            if (row.classList.contains('unavailable-option')) row.classList.remove('unavailable-option');
        })
    }
    
    //Categorias
    else if(type[0] == 'marcas-fk') {
        selectedBrand = type[1];

        //Products
        if (type[1] != 0) {
            productsFiltered = allProducts.filter(row => {
                return row[`${type[0]}`] == type[1]
            });
        }
        else {
            productsFiltered = allProducts;
        };

        //Title
        if (type[1] != 0) {
            titleText[1] = name;
        }
        else {
            titleText[1] = false;
        };

        //Other Filters
        if (selectedCategory > 0) productsFiltered = productsFiltered.filter(row => {
            return row[`categorias-fk`] == selectedCategory
        });

        //Brand selected
        brandOptions.forEach(row => {
            if (row.classList.contains('unavailable-option')) row.classList.remove('unavailable-option');
        })
    };

    //Titulo
    if (titleText[0] || titleText[1]) {

        filterTitle.innerText = (titleText[0] && titleText[1]) ? titleText.join(', ') : titleText[0] || titleText[1];
    }
    else {
        filterTitle.innerText = 'Productos seleccionados';
    };
};

//Filtrador Final de todos los Filtros
const productsFilter = (type, name, element) => {

    const filter = (type[0] == 'categorias-fk' && selectedCategory == 0) || (type[0] == 'marcas-fk' && selectedBrand == 0);

    if (element.id !== 'shopAllbtn') {

        if(filter) {
            addFilter(type, name);

            element.dataset.selected = true;
        }
        else {
            replaceFilter(type, name);
        };

        if ((type[0] == 'categorias-fk' && element.id !== 'category-all') || (type[0] == 'marcas-fk' && element.id !== 'brand-all')) element.classList.add('unavailable-option');
    }
    else {
        productsFiltered = allProducts;
        selectedBrand = selectedCategory = 0;
        titleText = [false, false];
        filterTitle.innerText = name;
        document.querySelectorAll('.unavailable-option').forEach(row => row.classList.remove('unavailable-option'));
    };

    showProducts(productsFiltered);

};

async function ready() {

    const categoryList = document.querySelector('#category-list');
    const brandList = document.querySelector('#brand-list');
    const shopCreate = document.querySelector('#shop-create');

    const productsFetch = await fetch('/api/product/list');
    const products = await productsFetch.json();
    allProducts = products.data.products;

    //Spinners
    document.querySelectorAll('.spinner').forEach(row => row.setAttribute('hidden', ''));

    productsFiltered = products.data.products;
    userRol = products.data.user || 1;

    showProducts(productsFiltered);

    // Montando filtros de navegacion
    //Categorias
    products.data.categories.forEach((category, y)  => {

        categoryList.innerHTML +=
        `<li><button  type="button" id="category-${y}" class="category-filter-option" onClick="productsFilter(['categorias-fk', ${category.id}], '${category.nombre}', this)" >${category.nombre}</button></li>
        `;
    });

    //Marcas
    products.data.brands.forEach((brand, y)  => {

        return brandList.innerHTML +=
        `<li><button type="button" id="brand-${y}" class="brand-filter-option" onClick="productsFilter(['marcas-fk', ${brand.id}], '${brand.nombre}', this)" >${brand.nombre}</button></li>
        `
    });

    //Boton dependiente rol usuario
    const createbtn = `<a class="btn color_size_btn" href="/product/create">CREAR PRODUCTO</a>`;

    const shopAllbtn = `<button class="btn" type="button" id="shopAllbtn" onClick="productsFilter([], 'Todos los productos', this)">Todos los Productos</button>`

    shopCreate.innerHTML = (products.data.user && products.data.user=="2") ? createbtn : shopAllbtn;

}


