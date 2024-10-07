document.addEventListener('editProductLoaded', ready);

function ready() {
  const nameProduct = document.querySelector('#name');
  const priceProduct = document.querySelector('#price');
  const stockProduct = document.querySelector('#stock');
  const descProduct = document.querySelector('#desc');
  const ingredientsProduct = document.querySelector('#ingredients');
  const labelsProduct = document.querySelector('#labels');
  const brandsProduct = document.querySelector('#brands');
  const sizeProduct = document.querySelector('#meassures');
  const colorsProduct = document.querySelector('#colors');
  const imgProduct = document.querySelector('#img');
  const buttonEdit = document.querySelector('#btn-edit');
  const imageInvalidText = document.querySelector('#image-invalid-text');
  const productId = document.querySelector('#product-id-storage');

  const extAllowed = ['.png', '.jpeg', '.jpg', '.img', '.gif'];
  const elements = [
    nameProduct,
    priceProduct,
    stockProduct,
    descProduct,
    labelsProduct,
    brandsProduct,
    sizeProduct,
    imgProduct,
  ];

  buttonEdit.addEventListener('click', async () => {
    //Generic Validations
    if (nameProduct.value.length < 5) {
      nameProduct.classList.add('is-invalid');
    }

    if (priceProduct.value < 1) {
      priceProduct.classList.add('is-invalid');
    }

    if (stockProduct.value < 1) {
      stockProduct.classList.add('is-invalid');
    }

    if (descProduct.value.length < 20) {
      descProduct.classList.add('is-invalid');
    }

    if (sizeProduct.value.length == 0) {
      sizeProduct.classList.add('is-invalid');
    }

    if (labelsProduct.value.length == 0) {
      labelsProduct.classList.add('is-invalid');
    }

    if (brandsProduct.value.length == 0) {
      brandsProduct.classList.add('is-invalid');
    }

    //Images Validation
    const imgFiles = [];

    if (imgProduct.files.length != 0) {
      Object.keys(imgProduct.files).forEach((row) => {
        imgFiles.push(imgProduct.files[row]);

        if (!extAllowed.find((ext) => imgProduct.files[row].name.includes(ext))) {
          imgProduct.classList.add('is-invalid');
          imageInvalidText.classList.add('d-flex');
        }
      });
    }

    //Setting info
    const fullVariants = document.querySelectorAll('.product-variant');
    let multipleCombination = false;

    const variantCombinations = [
      {
        precio: +priceProduct.value,
        cantidad: +stockProduct.value,
        'colores-fk': +colorsProduct.value > 0 ? +colorsProduct.value : null,
        'medidas-fk': +sizeProduct.value > 0 ? +sizeProduct.value : null,
        'grupos-productos-fk': +productId.innerHTML,
      },
    ];

    //Variant Validations
    if (fullVariants.length > 1) {
      //Filtering a node list
      const addedVariants = [];
      fullVariants.forEach((variant) => variant != fullVariants.item(0) && addedVariants.push(variant));

      addedVariants.forEach((_, i) => {
        const sizeVariant = document.querySelector(`#product-size-variant-${i + 1}`);
        const colorVariant = document.querySelector(`#product-color-variant-${i + 1}`);
        const stockVariant = document.querySelector(`#product-stock-variant-${i + 1}`);
        const priceVariant = document.querySelector(`#product-price-variant-${i + 1}`);

        //Blur event for removing edited invalid fields on Variant Products
        elements.push(sizeVariant, stockVariant, priceVariant);

        if (priceVariant.value < 1) {
          priceVariant.classList.add('is-invalid');
        }

        if (sizeVariant.value.length == 0) {
          sizeVariant.classList.add('is-invalid');
        }

        if (stockVariant.value < 1) {
          stockVariant.classList.add('is-invalid');
        }

        //Saving variant combination
        variantCombinations.push({
          precio: +priceVariant.value,
          cantidad: +stockVariant.value,
          'colores-fk': +colorVariant.value > 0 ? +colorVariant.value : null,
          'medidas-fk': +sizeVariant.value > 0 ? +sizeVariant.value : null,
          'grupos-productos-fk': +productId.innerHTML,
        });
      });

      //Verifying there are no repeated variants
      variantCombinations.forEach(async (variant, i, arr) => {
        if (!multipleCombination) {
          for (let y = i + 1; y < arr.length; y++) {
            if (arr[y]['colores-fk'] == variant['colores-fk'] && arr[y]['medidas-fk'] == variant['medidas-fk'])
              multipleCombination = true;
          }
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'Variantes Repetidas',
            text: 'Revisa que tus variantes sean únicas',
            showConfirmButton: true,
          });
        }
      });
    }

    //Blur event for removing edited invalid fields
    elements.forEach((row) => {
      row.addEventListener('blur', () => {
        row.classList.remove('is-invalid');
        if (row == imgProduct) imageInvalidText.classList.remove('d-flex');
      });
    });

    const errors = elements.filter((input) => input.classList.contains('is-invalid'));

    if (errors.length == 0 && !multipleCombination) {
      const warningAlert = await Swal.fire({
        icon: 'warning',
        title: '¿Seguro?',
        text: 'Se modificarán los valores de este producto',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
      });

      if (warningAlert.isConfirmed) {
        const formData = new FormData();

        //Generic Data Form
        formData.append('groupId', +productId.innerHTML);
        formData.append('name', nameProduct.value);
        formData.append('desc', descProduct.value);
        formData.append('ingredients', ingredientsProduct.value);
        formData.append('brand', +brandsProduct.value);
        formData.append('category', +labelsProduct.value);

        formData.append('variantProducts', JSON.stringify(variantCombinations));
        //Image Data Form
        imgFiles.forEach((img) => {
          formData.append('productImg', img);
        });

        //Fetch
        const productFetch = await fetch('/api/product/edit', { method: 'PUT', body: formData });
        const resFetch = await productFetch.json();

        //Response
        if (resFetch.meta.success) {
          await Swal.fire({
            icon: 'success',
            title: 'Edición completa',
            text: 'Tu producto ha sido editado con éxito',
            showConfirmButton: false,
            timer: 2000,
          });
          console.log(resFetch.data);
          window.location.href = `/product/detail/${resFetch.data.groupProductId}-${resFetch.data.firstProductId}`;
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: 'Parece que algo salió mal, porfavor vuelve a intentarlo más tarde',
            showConfirmButton: true,
          });
        }
      }
    }
  });
}
