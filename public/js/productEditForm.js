if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
};

//Storing require data for the functions
let globalFeatures = {};

const addSelectOptions = (select, type, variant) => {
    select.innerHTML += globalFeatures[type].reduce( (element, row) => {
        return element + `<option value="${ row.id }" ${variant == row.id ? 'selected' : '' }>${ row.nombre || row.medida }</option>`;
    }, '');
};

//Remove Product Vatiants
const removeVariant = async (id) => {

    if(id !== 'main-article') {

        const warningAlert = await Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro de borrar esta variante?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        });

        if(warningAlert.isConfirmed){
            document.querySelector(`#${id}`).remove();

            //Renaming all identifications by variant order
            const productVariants = document.querySelectorAll('.product-variant');
            
            //Removing main element from the list
            const addedVariants = [];
            productVariants.forEach(variant => variant != productVariants.item(0) && addedVariants.push(variant));

            addedVariants.forEach((variant, i) => {
                const newId = i + 1;
                const currentId = variant.id.match(/-(\d+)$/)[1];

                const btnRemove = document.querySelector(`#delete-variant-${currentId}`);
                const variantTitle = document.querySelector(`#variant-title-${currentId}`);
                const variantPrice = document.querySelector(`#product-price-variant-${currentId}`);
                const variantSize = document.querySelector(`#product-size-variant-${currentId}`);
                const variantColor = document.querySelector(`#product-color-variant-${currentId}`);
                const variantStock = document.querySelector(`#product-stock-variant-${currentId}`);

                //Remove
                btnRemove.setAttribute('onclick', `removeVariant('variant-article-${newId}')`);
                btnRemove.id = `delete-variant-${newId}`;

                //Title
                variantTitle.innerText = `Variante ${newId}`;
                variantTitle.id = `variant-title-${newId}`;

                //Price, Size, Color, Stock
                const options = [{element: variantPrice, type: 'price'}, {element: variantSize, type: 'size'}, {element: variantColor, type: 'color'}, {element: variantStock, type: 'stock'}];
                
                options.forEach(option => {
                    option.element.name = `${option.type}-variant-${newId}`;
                    option.element.id = `product-${option.type}-variant-${newId}`;
                });

                //Article Container
                variant.id = `variant-article-${newId}`;
            });

            Swal.fire({
                title: 'Variante Eliminada!',
                icon: 'success'
            });
        };
    } else {
        const warningAlert = await Swal.fire({
            icon: 'warning',
            title: '¿Borrar el Producto?',
            text: 'Se eliminará el producto con todas sus variantes',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar',
            showClass: {
                popup: 'animate__animated animate__bounceIn',
            }
        });

        if(warningAlert.isConfirmed){

            const data = {
                id: globalFeatures.productGroup.id
            };

            const userFetch = await fetch('/api/product/edit/delete', {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
            const user = await userFetch.json();

            if(user.meta.success) {

                await Swal.fire({
                    title: 'Producto eliminado',
                    // text: 'Accede a la lista de productos eliminados para ver mas detalles',
                    icon: 'success'
                });

                window.location.href = '/';
            }
            else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: 'Parece que algo salió mal, porfavor vuelve a intentarlo más tarde',
                    showConfirmButton: true
                });
            };
        };
    };
};

async function ready() {

    const imageContainer = document.querySelector('#image-container');
    const titleProduct = document.querySelector('#title-container');
    const priceProduct = document.querySelector('#price-container');
    const labels = document.querySelector('#labels');
    const size = document.querySelector('#meassures');
    const colors = document.querySelector('#colors');
    const brands = document.querySelector('#brands');
    const stockProduct = document.querySelector('#stock-container');
    const detailProduct = document.querySelector('#detail-container');
    const ingredientsProduct = document.querySelector('#ingredients-container');
    const addVariantBtn = document.querySelector('#variant-product');
    const versionsContainer = document.querySelector('#versions-container');

    //Extracting the productGroup id
    const currentPath = window.location.pathname;
    const idProduct = currentPath.match(/\/(\d+)-\d+$/); // for the last number == /-(\d+)$/
    const data = {id: idProduct[1]};

    //Fetch
    const productFetch = await fetch('/api/product/edit', {method: 'POST', headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)});
    const product = await productFetch.json();
    const info = product.data;
    globalFeatures = info;

    //Hidden info trick
    document.querySelector('#product-edit-title').insertAdjacentHTML('afterend', `<div id="product-id-storage" data-first-product-id="${info.productGroup.product[0].id}" hidden>${info.productGroup.id}</div>`);

    imageContainer.innerHTML += info.productGroup.image.reduce( (element, img, i) => {
        return element + `<div class="carousel-item ${ i == 0 ? 'active': '' }">
                            <img src="../../img/productos/${ img.nombre }" class="d-block w-100" alt="...">
                        </div>`;
    }, '');

    titleProduct.innerHTML += `<input type="text" class="form-control " id="name" name="name" value="${ info.productGroup.nombre }"> <div class="invalid-feedback">Selecciona un nombre para tu producto de al menos 5 caracteres</div>`;
    priceProduct.innerHTML += `<input type="text" class="form-control " id="price" name="price" value="${ info.productGroup.product[0].precio }"> <div class="invalid-feedback">Selecciona el precio del producto</div>`;
    stockProduct.innerHTML += `<input type="number" class="form-control " id="stock" name='stock' value="${ info.productGroup.product[0].cantidad }"> <div class="invalid-feedback">Selecciona la cantidad disponible de este producto</div>`;
    detailProduct.innerHTML += `<textarea class="form-control" id="desc" name="desc" rows="4">${ info.productGroup.detalle }</textarea> <div class="invalid-feedback">Agrega una descripcion a tu producto de al menos 20 caracteres</div>`;
    ingredientsProduct.innerHTML += `<textarea class="form-control" id="ingredients" name="ingredients" rows="4">${ info.productGroup.ingredientes || '' }</textarea> <div class="invalid-feedback">Agrega una descripcion a tu producto de al menos 20 caracteres</div>`;

    //Adding the options from the DB
    addSelectOptions(labels, 'categories', info.productGroup['categorias-fk']);
    addSelectOptions(brands, 'brands', info.productGroup['marcas-fk']);
    addSelectOptions(size, 'meassures', info.productGroup.product[0]['medidas-fk']);
    addSelectOptions(colors, 'colors', info.productGroup.product[0]['colores-fk']);
    
    const createVariantHTML = ({color, size, stock, price}) => {

        const productVariants = document.querySelectorAll('.product-variant');

        const currentVariant = productVariants.length;

        versionsContainer.insertAdjacentHTML('beforeend', `
            <article class="product-variant container bg-white shadow rounded-lg px-3 mt-5 py-4 mb-5" id="variant-article-${currentVariant}">

                <div class="position-relative">
                    <button type="button" class="btn btn-outline-danger position-absolute top-0 end-0" id="delete-variant-${currentVariant}" onclick="removeVariant('variant-article-${currentVariant}')">Eliminar Variante</button>
                </div>

                <div class="row">

                    <h3 class="productName my-2 mb-4" id="variant-title-${currentVariant}">Variante ${currentVariant}</h3>

                    <div class="d-flex flex-column justify-content-center align-items-center">
                        <div class="col-12 col-lg-8 pb-5 mt-5">

                            <div class="d-inline-block w-100 form-group productLabel my-2">
                                <label class="mb-2">Precio del producto</label>
                                <input class="form-control w-100" type="number" name="price-variant-${currentVariant}" id="product-price-variant-${currentVariant}" value="${price || ""}">
                                <div class="invalid-feedback">Selecciona el precio del producto</div>
                            </div>
                        
                            <div class="d-inline-block w-100 form-group productLabel my-2">
                                <label class="mb-2">Tamaño del producto</label>
                                <select class="form-control w-100" name="size-variant-${currentVariant}" id="product-size-variant-${currentVariant}">
                                    <option value="0" id="empty-size-variant-${currentVariant}">Unidad (Por Defecto)</option>
                                </select>
                            </div>

                            <div class="d-inline-block w-100 form-group productLabel my-2">
                                <label class="mb-2">Color</label>
                                <select class="form-control w-100" name="color-variant-${currentVariant}" id="product-color-variant-${currentVariant}">
                                    <option value="0" id="empty-color-variant-${currentVariant}"></option>
                                </select>
                            </div>

                            <div class="d-inline-block w-100 form-group productLabel my-2">
                                <label class="mb-2">Stock disponible:</label>
                                <input class="form-control w-100" type="number" name="stock-variant-${currentVariant}" id="product-stock-variant-${currentVariant}" value="${stock || 0}">
                                <div class="invalid-feedback">Selecciona la cantidad disponible de este producto</div>
                            </div>

                        </div>
                    </div>
                </div>
            </article>
        `);

        addSelectOptions(document.querySelector(`#product-size-variant-${currentVariant}`), 'meassures', size);
        addSelectOptions(document.querySelector(`#product-color-variant-${currentVariant}`), 'colors', color);
    };

    //Adding Variants
    info.productGroup.product.filter((product, i) => i !== 0).forEach((product) => createVariantHTML({color: product['colores-fk'], size: product['medidas-fk'], price: product.precio, stock: product.cantidad}));

    //Btn Add Product Vatiants
    addVariantBtn.addEventListener('click', () => createVariantHTML({color: -1, size: -1}));

    // creating the elements takes time so we create and event to communicate we are done with them
    const event = new Event('editProductLoaded');
    document.dispatchEvent(event);

};