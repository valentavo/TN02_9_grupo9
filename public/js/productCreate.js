document.addEventListener('createProductLoaded', ready);


let colorSelected = [];
let sizeSelected = [];

function borrarColor(id, element) {
    colorSelected = colorSelected.filter( row => row != id);
    document.querySelector(`#color-${id}`).remove();
    console.log(element);
    if (colorSelected.length == 0) {
        element.value = 0
    }
};

function borrarSize(id) {
    sizeSelected = sizeSelected.filter( row => row != id);
    document.querySelector(`#size-${id}`).remove();
};

function ready () {
    const colorSelect = document.querySelector('#colors');
    const sizeSelect = document.querySelector('#meassures');

    colorSelected = [];
    sizeSelected = [];

    colorSelect.addEventListener('change', () => {

        if(colorSelect.value != 0 && !colorSelected.includes(colorSelect.value)) {
            colorSelected.push(colorSelect.value);

            console.log(colorSelect);

            colorSelect.insertAdjacentHTML('afterend', `
                <span id="color-${colorSelect.value}" class="btn productCreateBtn position-relative my-2 mx-2">
                    ${colorSelect[colorSelect.value].textContent}
                    <input class="visually-hidden" type="checkbox" name="colores" value="${colorSelect.value}">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onclick="borrarColor(${colorSelect.value}, ${colorSelect})">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </span>`
            );
        };
    });

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
};