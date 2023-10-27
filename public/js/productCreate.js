document.addEventListener('createProductLoaded', ready);

function ready () {

    //Validations
    const createProduct = document.querySelector('#create-product');
    const productTitle = document.querySelector('#product-title');
    const productPrice = document.querySelector('#product-price');
    const productLabel = document.querySelector('#product-label');
    const productBrand = document.querySelector('#product-brand');
    const productSize = document.querySelector('#product-size');
    const productColor = document.querySelector('#product-color');
    const productStock = document.querySelector('#product-stock');
    const productDesc = document.querySelector('#product-detail');
    const productIng = document.querySelector('#product-ingredients');
    const productImg = document.querySelector('#product-img');
    const imageInvalidText = document.querySelector('#image-invalid-text');

    const extAllowed = ['.png', '.jpeg', '.jpg', '.img', '.gif'];

    const elements = [
        productTitle, productPrice, productLabel, productBrand, productSize, productStock, productDesc, productImg
    ];

     createProduct.addEventListener('click', async () => {

        //Generic Validations
        if(productTitle.value.length < 5) {
            productTitle.classList.add('is-invalid');
        };

        if(productPrice.value < 1) {
            productPrice.classList.add('is-invalid');
        };

        if(productLabel.value.length == 0) {
            productLabel.classList.add('is-invalid');
        };
        
        if(productBrand.value.length == 0) {
            productBrand.classList.add('is-invalid');
        };

        if(productSize.value.length == 0) {
            productSize.classList.add('is-invalid');
        };

        if(productStock.value < 1) {
            productStock.classList.add('is-invalid');
        };

        if(productDesc.value.length < 20 ) {
            productDesc.classList.add('is-invalid');
        };

        //Imagenes Validation
        const imgFiles = [];

        if(productImg.files.length != 0) {

            Object.keys(productImg.files).forEach(row => {

                imgFiles.push(productImg.files[row]);

                if(!extAllowed.find( ext => productImg.files[row].name.includes(ext))){
                    productImg.classList.add('is-invalid');
                    imageInvalidText.classList.add('d-flex');
                };
            });
        }
        else {
            productImg.classList.add('is-invalid');
            imageInvalidText.classList.add('d-flex');
        };

        const fullVariants = document.querySelectorAll('.product-variant');
        let multipleCombination = false;

        const variantCombinations = [{
            precio: +productPrice.value,
            cantidad: +productStock.value,
            'colores-fk': +productColor.value,
            'medidas-fk': +productSize.value
        }];

        //Variant Validations
        if(fullVariants.length > 1) {
            // console.log('TENEMOS VARIANTES');

            //Filtering a node list
            const addedVariants = [];
            fullVariants.forEach(variant => variant != fullVariants.item(0) && addedVariants.push(variant));

            addedVariants.forEach((_, i) => {
                const sizeVariant = document.querySelector(`#product-size-variant-${i + 1}`);
                const colorVariant = document.querySelector(`#product-color-variant-${i + 1}`);
                const stockVariant = document.querySelector(`#product-stock-variant-${i + 1}`);
                const priceVariant = document.querySelector(`#product-price-variant-${i + 1}`);

                //Blur event for removing edited invalid fields on Variant Products
                elements.push(sizeVariant, stockVariant, priceVariant);

                if(priceVariant.value < 1) {
                    priceVariant.classList.add('is-invalid');
                };

                if(sizeVariant.value.length == 0) {
                    sizeVariant.classList.add('is-invalid');
                };

                if(stockVariant.value < 1) {
                    stockVariant.classList.add('is-invalid');
                };

                //Saving variant combination
                variantCombinations.push({
                    precio: +priceVariant.value,
                    cantidad: +stockVariant.value,
                    'medidas-fk': +sizeVariant.value,
                    'colores-fk': +colorVariant.value
                });


            });

            //Verifying there is no repeated variants
            variantCombinations.forEach(async (variant, i, arr) => {

                if(!multipleCombination) {
                    for(let y = i+1; y < arr.length; y++) {
                        if (arr[y]['colores-fk'] == variant['colores-fk'] && arr[y]['medidas-fk'] == variant['medidas-fk']) multipleCombination = true
                    };
                } else {

                    await Swal.fire({
                        icon: 'error',
                        title: 'Variantes Repetidas',
                        text: 'Revisa que tus variantes sean únicas',
                        showConfirmButton: true
                    });
                };
                
            });
        };

        //Blur event for removing edited invalid fields
        elements.forEach( row => {
            row.addEventListener('blur', () => {
                row.classList.remove('is-invalid');
                if(row == productImg) imageInvalidText.classList.remove('d-flex');
            });
        });

        //Error Validations
        const errors = elements.filter(input => input.classList.contains('is-invalid'));

        if(errors.length == 0 && !multipleCombination) {

            const formData = new FormData();

            //Generic Data Form
            formData.append('name', productTitle.value);
            formData.append('desc', productDesc.value);
            formData.append('ingredients', productIng.value);
            formData.append('brand', productBrand.value);
            formData.append('category', productLabel.value);
            formData.append('variantProducts', JSON.stringify(variantCombinations));

            //Image Data Form
            imgFiles.forEach( img => {

                formData.append('productImg', img);
            });

            //Fetch
            const productFetch = await fetch('/api/product/create', {method: 'POST', body: formData});
            const resFetch = await productFetch.json();

            //Response
            if(resFetch.meta.success) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Creación completa',
                    text: 'Tu producto ha sido creado con éxito',
                    showConfirmButton: false,
                    timer: 2000
                });
                window.location.href = `/product/detail/${resFetch.data.product[0].id}`;
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