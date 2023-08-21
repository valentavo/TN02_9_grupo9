if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
}
else {
    ready();
};
function ready() {

    const button = document.querySelector('#delete-user');

    button.addEventListener('click', async () => {

        const confirmation = await Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            text: 'Esta acción no es reversible',
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Elimina mi cuenta',
            showClass: {
                popup: 'animate__animated animate__bounceIn',
            }
        });

        if (confirmation.isConfirmed) {

            const userFetch = await fetch('/api/user/delete', {method: 'DELETE', headers: {'Content-Type': 'application/json'}});
            const user = await userFetch.json();

            if(user.meta.success) {

                await Swal.fire({
                    title: 'Usuario eliminado',
                    text: 'te vamos a extrañar, vuelve pronto!',
                    icon: 'success',
                    showConfirmButton: true,
                });

                window.location = '/';
            }
        };
    })
};