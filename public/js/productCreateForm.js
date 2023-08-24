if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
};

async function ready() {
    const labels = document.querySelector('#product-label');
    const size = document.querySelector('#product-size');
    const colors = document.querySelector('#product-color');
    const brands = document.querySelector('#product-brand');

    const featuresFetch = await fetch('/api/product/create');
    const features = await featuresFetch.json(); 

    labels.innerHTML += features.data.categorias.reduce( (element, row) => {
        return element + `<option value="${ row.id }">${ row.nombre }</option>`;
    }, '');

    size.innerHTML += features.data.medidas.reduce( (element, row) => {
        return element + `<option value="${ row.id }">${ row.medida }</option>`;
    }, '');

    colors.innerHTML += features.data.colores.reduce( (element, row) => {
        return element + `<option value="${ row.id }">${ row.nombre }</option>`;
    }, '');

    brands.innerHTML += features.data.marcas.reduce( (element, row) => {
        return element + `<option value="${ row.id }">${ row.nombre }</option>`;
    }, '');

    // creating the elements takes time so we create and event to communicate we are done with them
    const event = new Event('createProductLoaded');
    document.dispatchEvent(event);

};