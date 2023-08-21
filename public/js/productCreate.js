if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
};

async function ready() {
    const labels = document.querySelector('#labels');
    const meassures = document.querySelector('#meassures');
    const colors = document.querySelector('#colors');
    const brands = document.querySelector('#brands');

    const featuresFetch = await fetch('/api/product/create');
    const features = await featuresFetch.json(); 

    labels.innerHTML += features.data.categorias.reduce( (element, cat) => {
        return element + `<option value="${ cat.id }">${ cat.nombre }</option>`;
    }, '');

    meassures.innerHTML += features.data.medidas.reduce( (element, cat) => {
        return element + `<option value="${ cat.id }">${ cat.medida }</option>`;
    }, '');

    colors.innerHTML += features.data.colores.reduce( (element, cat) => {
        return element + `<option value="${ cat.id }">${ cat.nombre }</option>`;
    }, '');

    brands.innerHTML += features.data.marcas.reduce( (element, cat) => {
        return element + `<option value="${ cat.id }">${ cat.nombre }</option>`;
    }, '');

    // creating the elements takes time so we create and event to communicate we are done with them
    const event = new Event('createProductLoaded');
    document.dispatchEvent(event);

};