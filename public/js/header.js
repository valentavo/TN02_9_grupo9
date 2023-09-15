if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
};

async function ready() {

    cartNotification();
};

function cartNotification () {

    if (window.location.pathname == '/product/cart') {
        localStorage.setItem('carritoNoti', JSON.stringify(false));
    }

    if (JSON.parse(localStorage.getItem('carritoNoti'))) {
        document.querySelector('#cart-notification').classList.remove('visually-hidden');
    }
};