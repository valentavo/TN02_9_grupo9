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
    const buttonDelete = document.querySelector('#btn-delete');
    const productId = document.querySelector('#product-id-storage');

    const extAllowed = ['.png', '.jpeg', '.jpg', '.img', '.gif'];
    const elements = [nameProduct, priceProduct, stockProduct, descProduct, labelsProduct, brandsProduct, imgProduct];

    elements.forEach( row => {
        row.addEventListener('blur', () => {
            row.classList.remove('is-invalid');
        });
    });

    buttonEdit.addEventListener('click', async () => {

        //Validations

        if(nameProduct.value.length < 5) {
            nameProduct.classList.add('is-invalid');
        };

        if(priceProduct.value < 1) {
            priceProduct.classList.add('is-invalid');
        };

        if(stockProduct.value < 1) {
            stockProduct.classList.add('is-invalid');
        };

        if(descProduct.value.length < 20) {
            descProduct.classList.add('is-invalid');
        };

        if(labelsProduct.value.length == 0) {
            labelsProduct.classList.add('is-invalid');
        };

        if(brandsProduct.value.length == 0) {
            brandsProduct.classList.add('is-invalid');
        };

        const imgFiles =[]; 

        if(imgProduct.files.length != 0) {

            Object.keys(imgProduct.files).forEach(row => {

                imgFiles.push(imgProduct.files[row]);

                if(!extAllowed.find( ext => imgProduct.files[row].name.includes(ext))){
                    imgProduct.classList.add('is-invalid');
                };
            })
        };

        const errors = elements.filter(input => input.classList.contains('is-invalid'));

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

    buttonDelete.addEventListener('click', async () => {
        
        const confirmation = await Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            text: 'Tu producto sera borrado',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar producto',
            showClass: {
                popup: 'animate__animated animate__bounceIn',
            }
        });

        if (confirmation.isConfirmed) {

            const data = {
                id: productId.innerHTML
            };

            const userFetch = await fetch('/api/product/edit/delete', {method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)});
            const user = await userFetch.json();

            if(user.meta.success) {

                await Swal.fire({
                    title: 'Producto eliminado',
                    // text: 'Accede a la lista de productos eliminados para ver mas detalles',
                    icon: 'success',
                    showConfirmButton: true,
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
    });
};