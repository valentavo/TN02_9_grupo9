if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
};

//Storing require data for the functions
let globalFeatures = {};

//Remove Product Vatiants
const removeVariant = async (id) => {

    const warningAlert = await Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro de borrar esta variante?',
        showCancelButton: true,
        confirmButtonColor: '#54c738',
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
};

const addSelectOptions = (select, type) => {
    select.innerHTML += globalFeatures.data[type].reduce( (element, row) => {
        return element + `<option value="${ row.id }">${ row.nombre || row.medida }</option>`;
    }, '');
};

async function ready() {
    //Selecting the elements to be used
    const labels = document.querySelector('#product-label');
    const size = document.querySelector('#product-size');
    const colors = document.querySelector('#product-color');
    const brands = document.querySelector('#product-brand');
    const addVariantBtn = document.querySelector('#variant-product');
    const versionsContainer = document.querySelector('#versions-container');

    //Fetch
    const featuresFetch = await fetch('/api/product/create');
    const features = await featuresFetch.json();
    globalFeatures = features;

    //Adding the options from the DB
    addSelectOptions(labels, 'categorias');
    addSelectOptions(brands, 'marcas');
    addSelectOptions(size, 'medidas');
    addSelectOptions(colors, 'colores');

    //Adding Product Vatiants
    addVariantBtn.addEventListener('click', () => {

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
                                <input class="form-control w-100" type="number" name="price-variant-${currentVariant}" id="product-price-variant-${currentVariant}">
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
                                <input class="form-control w-100" type="number" name="stock-variant-${currentVariant}" id="product-stock-variant-${currentVariant}" value="0">
                                <div class="invalid-feedback">Selecciona la cantidad disponible de este producto</div>
                            </div>

                        </div>
                    </div>
                </div>
            </article>
        `);

        addSelectOptions(document.querySelector(`#product-size-variant-${currentVariant}`), 'medidas');
        addSelectOptions(document.querySelector(`#product-color-variant-${currentVariant}`), 'colores');
    });

    // creating the elements takes time so we create and event to communicate we are done with them
    const event = new Event('createProductLoaded');
    document.dispatchEvent(event);

};