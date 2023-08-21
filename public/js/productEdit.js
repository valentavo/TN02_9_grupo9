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
    const info = product.data;

    imageContainer.innerHTML += info.product.image.reduce( (element, img, i) => {
        return element + `<div class="carousel-item ${ i == 0 ? 'active': '' }">
                            <img src="../../img/productos/${ img.nombre }" class="d-block w-100" alt="...">
                        </div>`;
    }, '');

    titleProduct.innerHTML += `<input type="text" class="form-control" name="name" value="${ info.product.nombre }">`;
    priceProduct.innerHTML += `<input type="text" class="form-control " name="price" value="${ info.product.precio }">`;
    stockProduct.innerHTML += `<input type="number" class="form-control " name='stock' value="${ info.product.cantidad }">`;
    detailProduct.innerHTML += `<textarea class="form-control" name="desc" rows="4">${ info.product.detalle }</textarea>`;

    labels.innerHTML += info.categories.reduce( (element, cat) => {
        return element + `<option value="${ cat.id }" ${ info.product.category.id == cat.id ? 'selected' : '' }>${ cat.nombre }</option>`;
    }, '');

    meassures.innerHTML += info.meassures.reduce( (element, size) => {
        return element + `<option value="${ size.id }" ${ info.product.size.length != 0 ? info.product.size[0].id == size.id ? 'selected' : '' : ''}>${ size.medida }</option>`;
    }, '');

    colors.innerHTML += info.colors.reduce( (element, color) => {
        return element + `<option value="${ color.id }" ${ info.product.size.length != 0 ? info.product.color[0].id == color.id ? 'selected' : '' : ''}>${ color.nombre }</option>`;
    }, '');

    brands.innerHTML += info.brands.reduce( (element, brand) => {
        return element + `<option value="${ brand.id }" ${ info.product.size.length != 0 ? info.product.brand.id == brand.id ? 'selected' : '' : ''}>${ brand.nombre }</option>`;
    }, '');

    // creating the elements takes time so we create and event to communicate we are done with them
    const event = new Event('editProductLoaded');
    document.dispatchEvent(event);

};