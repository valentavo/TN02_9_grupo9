if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
};

let colorSelected = [];
let sizeSelected = [];

function borrarColor(id) {
    const colorSelect = document.querySelector('#colors');
    colorSelected = colorSelected.filter( row => row != id);
    document.querySelector(`#color-${id}`).remove();
    colorSelect.value = 0;
};

function borrarSize(id) {
    const sizeSelect = document.querySelector('#meassures');
    sizeSelected = sizeSelected.filter( row => row != id);
    document.querySelector(`#size-${id}`).remove();
    sizeSelect.value = 0;
};

async function ready() {

    const imageContainer = document.querySelector('#image-container');
    const titleProduct = document.querySelector('#title-container');
    const priceProduct = document.querySelector('#price-container');
    const labels = document.querySelector('#labels');
    const meassures = document.querySelector('#meassures');
    const colors = document.querySelector('#colors');
    const brands = document.querySelector('#brands');
    const stockProduct = document.querySelector('#stock-container');
    const detailProduct = document.querySelector('#detail-container');

    const currentPath = window.location.pathname;
    const idProduct = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const data = {id: idProduct};

    const productFetch = await fetch('/api/product/edit', {method: 'POST', headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)});
    const product = await productFetch.json();
    const info = product.data;

    document.querySelector('#product-edit-title').insertAdjacentHTML('afterend', `<div id="product-id-storage" hidden>${info.product.id}</div>`);

    imageContainer.innerHTML += info.product.image.reduce( (element, img, i) => {
        return element + `<div class="carousel-item ${ i == 0 ? 'active': '' }">
                            <img src="../../img/productos/${ img.nombre }" class="d-block w-100" alt="...">
                        </div>`;
    }, '');

    titleProduct.innerHTML += `<input type="text" class="form-control " id="name" name="name" value="${ info.product.nombre }"> <div class="invalid-feedback">Selecciona un nombre para tu producto de al menos 5 caracteres</div>`;
    priceProduct.innerHTML += `<input type="text" class="form-control " id="price" name="price" value="${ info.product.precio }"> <div class="invalid-feedback">Selecciona el precio del producto</div>`;
    stockProduct.innerHTML += `<input type="number" class="form-control " id="stock" name='stock' value="${ info.product.cantidad }"> <div class="invalid-feedback">Selecciona la cantidad disponible de este producto</div>`;
    detailProduct.innerHTML += `<textarea class="form-control" id="desc" name="desc" rows="4">${ info.product.detalle }</textarea> <div class="invalid-feedback">Agrega una descripcion a tu producto de al menos 20 caracteres</div>`;

    labels.innerHTML += info.categories.reduce( (element, cat) => {
        return element + `<option value="${ cat.id }" ${ info.product.category.id == cat.id ? 'selected' : '' }>${ cat.nombre }</option>`;
    }, '');

    meassures.innerHTML += info.meassures.reduce( (element, size) => {
        return element + `<option value="${ size.id }">${ size.medida }</option>`;
    }, '');

    colors.innerHTML += info.colors.reduce( (element, color) => {
        return element + `<option value="${ color.id }">${ color.nombre }</option>`;
    }, '');

    brands.innerHTML += info.brands.reduce( (element, brand) => {
        return element + `<option value="${ brand.id }" ${ info.product.brand.id == brand.id ? 'selected' : ''}>${ brand.nombre }</option>`;
    }, '');

    info.product.color.forEach( color => {

        colorSelected.push(color.id);

        colors.insertAdjacentHTML('afterend', `
            <span id="color-${color.id}" class="btn productEditBtn position-relative my-2 mx-2">
                ${color.nombre}
                <input class="visually-hidden" type="checkbox" name="colores" value="${color.id}">
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onclick="borrarColor(${color.id})">
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </span>`
        );
    });
    
    info.product.size.forEach( size => {

        sizeSelected.push(size.id);

        meassures.insertAdjacentHTML('afterend', `
            <span id="size-${size.id}" class="btn productEditBtn position-relative my-2 mx-2">
                ${size.medida}
                <input class="visually-hidden" type="checkbox" name="medidas" value="${size.id}">
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onclick="borrarSize(${size.id})">
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </span>`
        );
    });

    //Color selected elements
    colors.addEventListener('change', () => {

        if(colors.value != 0 && !colorSelected.includes(Number(colors.value))) {
            colorSelected.push(Number(colors.value));

            colors.insertAdjacentHTML('afterend', `
                <span id="color-${colors.value}" class="btn productEditBtn position-relative my-2 mx-2">
                    ${colors[colors.value].textContent}
                    <input class="visually-hidden" type="checkbox" name="colores" value="${colors.value}">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onclick="borrarColor(${colors.value})">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </span>`
            );
        };
    });

    //Size selected elements
    meassures.addEventListener('change', () => {

        if(meassures.value != 0 && !sizeSelected.includes(Number(meassures.value))) {
            sizeSelected.push(Number(meassures.value));

            meassures.insertAdjacentHTML('afterend', `
                <span id="size-${meassures.value}" class="btn productEditBtn position-relative my-2 mx-2">
                    ${meassures[meassures.value].textContent}
                    <input class="visually-hidden" type="checkbox" name="medidas" value="${meassures.value}">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onclick="borrarSize(${meassures.value})">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </span>`
            );
        };
    });

    // creating the elements takes time so we create and event to communicate we are done with them
    const event = new Event('editProductLoaded');
    document.dispatchEvent(event);

};