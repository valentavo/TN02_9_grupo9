document.addEventListener('createProductLoaded', ready);


let colorSelected = [];
let sizeSelected = [];

function borrarColor(id) {
    const colorSelect = document.querySelector('#product-color');
    colorSelected = colorSelected.filter( row => row != id);
    document.querySelector(`#color-${id}`).remove();
    colorSelect.value = 0;
};

function borrarSize(id) {
    const sizeSelect = document.querySelector('#product-size');
    sizeSelected = sizeSelected.filter( row => row != id);
    document.querySelector(`#size-${id}`).remove();
    sizeSelect.value = 0;
};

function ready () {
    const colorSelect = document.querySelector('#product-color');
    const sizeSelect = document.querySelector('#product-size');

    colorSelected = [];
    sizeSelected = [];

    //Color selected elements
    colorSelect.addEventListener('change', () => {

        if(colorSelect.value != 0 && !colorSelected.includes(colorSelect.value)) {
            colorSelected.push(colorSelect.value);

            colorSelect.insertAdjacentHTML('afterend', `
                <span id="color-${colorSelect.value}" class="btn productCreateBtn position-relative my-2 mx-2">
                    ${colorSelect[colorSelect.value].textContent}
                    <input class="visually-hidden" type="checkbox" name="colores" value="${colorSelect.value}">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onclick="borrarColor(${colorSelect.value})">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </span>`
            );
        };
    });

    //Size selected elements
    sizeSelect.addEventListener('change', () => {

        if(sizeSelect.value != 0 && !sizeSelected.includes(sizeSelect.value)) {
            sizeSelected.push(sizeSelect.value);

            sizeSelect.insertAdjacentHTML('afterend', `
                <span id="size-${sizeSelect.value}" class="btn productCreateBtn position-relative my-2 mx-2">
                    ${sizeSelect[sizeSelect.value].textContent}
                    <input class="visually-hidden" type="checkbox" name="medidas" value="${sizeSelect.value}">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onclick="borrarSize(${sizeSelect.value})">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </span>`
            );
        };
    });

    //Validations

    const createProduct = document.querySelector('#create-product');
    const productTitle = document.querySelector('#product-title');
    const productPrice = document.querySelector('#product-price');
    const productLabel = document.querySelector('#product-label');
    const productBrand = document.querySelector('#product-brand');
    const productStock = document.querySelector('#product-stock');
    const productDesc = document.querySelector('#product-detail');
    const productImg = document.querySelector('#product-img');

    const extAllowed = ['.png', '.jpeg', '.jpg', '.img', '.gif'];

    const elements = [
        productTitle, productPrice, productLabel, productBrand, productStock, productDesc, productImg
    ];

     createProduct.addEventListener('click', async () => {

        elements.forEach( row => {
            row.addEventListener('blur', () => {
                row.classList.remove('inputError');
            });
        });

        if(productTitle.value.length < 5) {
            productTitle.classList.add('inputError');
        };

        if(productPrice.value.length == 0) {
            productPrice.classList.add('inputError');
        };

        if(productLabel.value.length == 0) {
            productLabel.classList.add('inputError');
        };
        
        if(productBrand.value.length == 0) {
            productBrand.classList.add('inputError');
        };

        if(productStock.value.length == 0) {
            productStock.classList.add('inputError');
        };

        if(productDesc.value.length < 20 ) {
            productDesc.classList.add('inputError');
        };

        const imgFiles =[]; 

        if(productImg.files.length != 0) {

            Object.keys(productImg.files).forEach(row => {

                imgFiles.push(productImg.files[row]);

                if(!extAllowed.find( ext => productImg.files[row].name.includes(ext))){
                    productImg.classList.add('inputError');
                };
            })
        }
        else {
            productImg.classList.add('inputError');
        };

        const errors = elements.filter(input => input.classList.contains('inputError'));

        if(errors.length == 0) {
            const colorCheck = document.querySelectorAll('[name="colores"]');
            const sizeCheck = document.querySelectorAll('[name="medidas"]');

            const color = [];
            const medida = [];

            for (let x of colorCheck.values()) {
                color.push(+x.value) // converting the strings to numbers
            };
            for (let x of sizeCheck.values()) {
                medida.push(+x.value)
            };

            const formData = new FormData();

            formData.append('name', productTitle.value);
            formData.append('price', productPrice.value);
            formData.append('desc', productDesc.value);
            formData.append('stock', productStock.value);
            formData.append('brand', productBrand.value);
            formData.append('category', productLabel.value);
            formData.append('color', JSON.stringify(color));
            formData.append('size', JSON.stringify(medida));

            imgFiles.forEach( img => {

                formData.append('productImg', img);
            });

            const productFetch = await fetch('/api/product/create', {method: 'POST', body: formData});
            const resFetch = await productFetch.json();

            if(resFetch.meta.success) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Creación completa',
                    text: 'Tu producto ha sido creado con éxito',
                    showConfirmButton: false,
                    timer: 2000
                });
                window.location.href = `/product/detail/${resFetch.data.id}`;
            }
            else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: 'Parece que algo salió mal, porfavor vuelve a intentarlo más tarde',
                    showConfirmButton: true
                });
            };
        }

    });
       
};


