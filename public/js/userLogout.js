if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
};

function ready() {

    const button = document.querySelector('#logout-user');

    button.addEventListener('click', async () => {
        await fetch('/api/user/logout');
        window.location.href = '/';
    });

};