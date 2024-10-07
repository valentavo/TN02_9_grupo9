if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

//All info related to a variation product that changes upon selecting a variation
const variationReset = () => {
  const colorSelect = document.querySelector('#colorSelect');
  const sizeSelect = document.querySelector('#sizeSelect');
  const productPrice = document.querySelector('#product-price');

  const selectedVariant = allCombinations.find((product) => {
    return (
      (product.color ? colorSelect.value == product.color?.id : product.color == null) &&
      sizeSelect.value == (product.size?.id || 0)
    );
  });

  productPrice.innerHTML = `$${selectedVariant.precio}`;

  //Modificando URL sin refrescar
  history.replaceState(null, null, `${selectedVariant['grupos-productos-fk']}-${selectedVariant.id}`);
};

//Size Change Event
let allStockCombinations = [];
let allCombinations = [];
const availableCombination = (sizeValue) => {
  const colorSelect = document.querySelector('#colorSelect');

  if (colorSelect) {
    //Removing all options
    const options = document.querySelectorAll('.colorOptions');
    options.forEach((row) => row.remove());

    //Returning all possible combinations
    allStockCombinations
      .filter((product) => (product.size?.id || 0) == sizeValue)
      .forEach((product) => {
        if (product.color) {
          colorSelect.innerHTML += `<option class="colorOptions" id="color-${product.color.id}" value='${product.color.id}'>${product.color.nombre}</option>`;
        }
      });
  }

  variationReset();
};

async function ready() {
  const productImage = document.querySelector('#image-container');
  const productName = document.querySelector('#product-name');
  const productPrice = document.querySelector('#product-price');
  const productDesc = document.querySelector('#product-description');
  const productAccordionDescIng = document.querySelector('#accordion-desc-ing');
  const relatedProducts = document.querySelector('#related-products');

  const currentPath = window.location.pathname;
  const urlIds = currentPath.match(/(\d+)-(\d+)$/);
  const data = { productId: urlIds[2], productGroupId: urlIds[1] };

  const productFetch = await fetch('/api/product/detail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const info = await productFetch.json();
  const productGroup = info.data.detailGroup;
  allCombinations = productGroup.product;
  const productDetail = info.data.detail;

  allStockCombinations = productGroup.product
    .map((product) => {
      return {
        id: product.id,
        cantidad: product.cantidad,
        precio: product.precio,
        size: product.size,
        color: product.color,
      };
    })
    .filter((product) => product.cantidad > 0);

  //Imagenes
  productGroup.image.forEach((img, i) => {
    productImage.innerHTML += `
                            <div class="carousel-item ${i == 0 ? 'active' : ''}">
                                <img src="../../img/productos/${img.nombre}" class="d-block w-100 pic" alt="${
      img.nombre
    }">
                            </div>`;
  });

  //Nombre y precio
  productName.innerHTML = productGroup.nombre;
  productPrice.innerHTML = `$${productDetail.precio}`;

  /*
    //Cases

    1- producto con color available
    2- producto con color sin Stock
    3- producto sin color available
    4- producto sin color sin Stock

    */

  //Medidas
  if (productGroup.product.find((row) => row['medidas-fk'] != null)) {
    let sizeOptions = '';
    //Array unico de cada medida
    const sizeList = [...new Set(productGroup.product.map((prod) => prod.size?.id))].map((id, _, arr) => {
      return {
        id: id || 0,
        medida: id && productGroup.product.find((prod) => prod.size?.id == id).size.medida,
      };
    });

    sizeList.forEach((size) => {
      sizeOptions += `<option value='${size.id}' ${(productDetail['medidas-fk'] || 0) == size.id ? 'selected' : ''} ${
        allStockCombinations.filter((product) => (product.size?.id || 0) == size.id).length == 0 ? 'disabled' : ''
      }>${size.medida || 'Unidad (Default)'}</option>`;
    });

    productPrice.insertAdjacentHTML(
      'afterend',
      `
                    <label for="size" class="text-muted productSize mt-2 mb-2">Medidas:</label>
                    <select class="form-select" name="size" id="sizeSelect" onchange="availableCombination(this.value)">${sizeOptions}</select>`
    );
  }

  //Colores
  const productsWtihColor = allStockCombinations.filter((row) => row.color);

  if (productsWtihColor.length > 0) {
    const sizeSelect = document.querySelector('#sizeSelect');

    let colorsVariant = allStockCombinations.filter((product) => (product.size?.id || 0) == sizeSelect.value);

    //In case there is no Stock color available for that size
    if (colorsVariant.length == 0) {
      //Select the combination of colors that matches the size of the first combination in allStockCombinations array
      // colorsVariant = productsWtihColor.filter(product => product.size.id == allStockCombinations[0].size.id);
      colorsVariant = productGroup.product
        .map((product) => {
          return {
            id: product.id,
            cantidad: product.cantidad,
            precio: product.precio,
            size: product.size,
            color: product.color,
          };
        })
        .filter((product) => product.size.id == sizeSelect.value);

      //Toastify Alert
      Toastify({
        text: 'Producto Agotado',
        duration: 4000,
        close: true,
        style: {
          background: 'red',
        },
        gravity: 'top',
        position: 'right',
      }).showToast();
    }

    let colorOptions = '';

    //Verificando que la medida tenga colores, de lo contrario es select vacio
    if (colorsVariant[0].color) {
      colorsVariant.forEach((prod) => {
        colorOptions += `<option class="colorOptions" id="color-${prod.color.id}" value='${prod.color.id}' ${
          productDetail['colores-fk'] == prod.color.id ? 'selected' : ''
        }>${prod.color.nombre}</option>`;
      });
    }

    sizeSelect.insertAdjacentHTML(
      'afterend',
      `
                    <label for="color" class="text-muted productSize mt-2 mb-2">Color:</label>
                    <select class="form-select" name="color" id="colorSelect" onchange="variationReset()">${colorOptions}</select>`
    );
  }

  //Detalles e Ingredientes
  productDesc.innerHTML = `${productGroup.detalle}`;
  productGroup.ingredientes
    ? (productAccordionDescIng.innerHTML += `
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false">
                    <strong>Ingredientes</strong>
                </button>
            </h2>

            <div id="collapseTwo" class="accordion-collapse collapse show" aria-labelledby="headingTwo">
                <div class="accordion-body">${productGroup.ingredientes}</div>
            </div>
        </div>`)
    : '';

  //Productos Relacionados
  relatedProducts.innerHTML += info.data.related.reduce((acc, row) => {
    return (acc += `<div class="col-lg-3 ">
                        <div class="card p-2">
                            <div class="card-body">
                                <div class="star">

                                </div>
                                <a href="/product/detail/${row.id}-${row.product[0].id}"><img src="../../img/productos/${row.image[0].nombre}" class="img-fluid pb-3" alt=""></a>
                                <h4 class="productNameH"><a class="anchorLinks" href="/product/detail/${row.id}-${row.product[0].id}">${row.nombre}</a></h4>
                                <p class="productSizeH">2 x 454g / 160oz</p>
                                <h4 class="productPriceH">$${row.product[0].precio}</h4>
                                <button class="btnc my-4 productCartBtn"><a class="link-detail-btn" href="/product/detail/${row.id}-${row.product[0].id}">Detalle</a></button>

                            </div>
                        </div>
                    </div>`);
  }, '');

  const event = new Event('detailProductLoaded');
  document.dispatchEvent(event);
}
