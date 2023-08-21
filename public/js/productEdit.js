if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
};

async function ready() {

    const imageContainer = document.querySelector('#image-container');
    const titleProduct =document.querySelector('#title-container');
    const priceProduct =document.querySelector('#price-container');
    const labels =document.querySelector('#labels');
    const meassures =document.querySelector('#meassures');
    const colors =document.querySelector('#colors');
    const brands =document.querySelector('#brands');
    const stockProduct =document.querySelector('#stock-container');
    const detailProduct =document.querySelector('#detail-container');

    const currentPath = window.location.pathname;
    const idProduct = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const data = {id: idProduct};

    const productFetch = await fetch('/api/product/edit', {method: 'POST', headers: {'Content-Type': 'application/json' }, body: JSON.stringify(data)});
    const product = await productFetch.json();

    imageContainer.innerHTML += product.data.image.reduce( (element, img, i) => {
        return element + `<div class="carousel-item ${ i == 0 ? 'active': '' }">
                            <img src="../../img/productos/${ img.nombre }" class="d-block w-100" alt="...">
                        </div>`;
    }, '');

    titleProduct.innerHTML += `<input type="text" class="form-control" name="name" value="${ product.data.product.nombre }">`;
    priceProduct.innerHTML += `<input type="text" class="form-control " name="price" value="${ product.data.product.precio }>">`;
    stockProduct.innerHTML += `<input type="number" class="form-control " name='stock' value="${ product.data.product.cantidad }">`;
    detailProduct.innerHTML += `<textarea class="form-control" name="desc" rows="4">${ product.data.product.detalle }</textarea>`;

    labels.innerHTML += product.data.categories.reduce( (element, cat) => {
        return element + `<option value="${ cat.id }" ${ product.category.id == cat.id ? 'selected' : '' }>${ cat.nombre }</option>`;
    }, '');

    meassures.innerHTML += product.data.meassures.reduce( (element, size) => {
        return element + `<option value="${ size.id }" ${ product.size.id == size.id ? 'selected' : '' }>${ size.medida }</option>`;
    }, '');

    colors.innerHTML += product.data.colors.reduce( (element, color) => {
        return element + `<option value="${ color.id }" ${ product.color.id == color.id ? 'selected' : '' }>${ color.nombre }</option>`;
    }, '');

    brands.innerHTML += product.data.brands.reduce( (element, brand) => {
        return element + `<option value="${ brand.id }" ${ product.brand.id == brand.id ? 'selected' : '' }>${ brand.nombre }</option>`;
    }, '');

    // creating the elements takes time so we create and event to communicate we are done with them
    const event = new Event('editProductLoaded');
    document.dispatchEvent(event);

};