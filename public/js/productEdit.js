document.addEventListener('editProductLoaded', ready);

function ready() {

    const nameProduct = document.querySelector('#name');
    const priceProduct = document.querySelector('#price');
    const stockProduct = document.querySelector('#stock');
    const descProduct = document.querySelector('#desc');
    const labelsProduct = document.querySelector('#labels');
    const brandsProduct = document.querySelector('#brands');
    const imgProduct = document.querySelector('#img');
    const buttonEdit = document.querySelector('#btn-edit');

    const extAllowed = ['.png', '.jpeg', '.jpg', '.img'];
    const elements = [nameProduct, priceProduct, stockProduct, descProduct, labelsProduct, brandsProduct, imgProduct];

    elements.forEach( row => {
        row.addEventListener('blur', () => {
            row.classList.remove('inputError');
        });
    });

    buttonEdit.addEventListener('click', async () => {

        //Validations

        if(nameProduct.value.length == 0) {
            nameProduct.classList.add('inputError');
        };

        if(priceProduct.value.length == 0) {
            priceProduct.classList.add('inputError');
        };

        if(stockProduct.value.length == 0) {
            stockProduct.classList.add('inputError');
        };

        if(descProduct.value.length == 0) {
            descProduct.classList.add('inputError');
        };

        if(labelsProduct.value.length == 0) {
            labelsProduct.classList.add('inputError');
        };

        if(brandsProduct.value.length == 0) {
            brandsProduct.classList.add('inputError');
        };

        const imgFiles =[]; 

        if(imgProduct.files.length != 0) {

            Object.keys(imgProduct.files).forEach(row => {

                imgFiles.push(imgProduct.files[row]);

                if(!extAllowed.find( ext => imgProduct.files[row].name.includes(ext))){
                    imgProduct.classList.add('inputError');
                };
            })
        }
        else {
            imgProduct.classList.add('inputError');
        };

        const errors = elements.filter(input => input.classList.contains('inputError'));

        if(errors.length == 0) {

            const colorCheck = document.querySelectorAll('[name="colores"]');
            const sizeCheck = document.querySelectorAll('[name="medidas"]');
            const productId = document.querySelector('#product-id-storage');

            const color = [];
            const medida = [];

            for (let x of colorCheck.values()) {
                color.push(+x.value) // converting the strings to numbers
            };
            for (let x of sizeCheck.values()) {
                medida.push(+x.value)
            };

            const formData = new FormData();

            formData.append('id', productId.innerHTML);
            formData.append('name', nameProduct.value);
            formData.append('price', priceProduct.value);
            formData.append('desc', descProduct.value);
            formData.append('stock', stockProduct.value);
            formData.append('brand', brandsProduct.value);
            formData.append('category', labelsProduct.value);
            formData.append('color', JSON.stringify(color));
            formData.append('size', JSON.stringify(medida));

            imgFiles.forEach( img => {

                formData.append('productImg', img);
            });

            const productFetch = await fetch('/api/product/edit', {method: 'PUT', body: formData});
            const resFetch = await productFetch.json();

             if(resFetch.meta.success) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Edición completa',
                    text: 'Tu producto ha sido editado con éxito',
                    showConfirmButton: false,
                    timer: 2000
                });
                window.location.href = `/product/detail/${productId.innerHTML}`;
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
    });
};