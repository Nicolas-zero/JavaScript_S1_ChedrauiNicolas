window.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll("input[type='text'], input[type='date'], select");
    const registroTrajes = document.getElementById("registro-trajes");
    const btnNuevo = document.getElementById("nuevo");
    const btnCancelar = document.getElementById("cancelar");
    const btnAgregarTraje = document.querySelector(".agregar-traje");

    function desactivarFormulario() {
        inputs.forEach(input => {
            input.disabled = true;
            input.style.backgroundColor = "#e9ecef";
        });
        if (registroTrajes) {
            registroTrajes.style.display = "none";
        }
    }

    function activarFormulario() {
        inputs.forEach(input => {
            input.disabled = false;
            input.style.backgroundColor = "#ffffff";
        });
        if (registroTrajes) {
            registroTrajes.style.display = "block";
        }
    }

    // Estado inicial
    desactivarFormulario();

    btnNuevo.addEventListener("click", activarFormulario);
    btnCancelar.addEventListener("click", desactivarFormulario);

    // Crear dinámicamente trajes al presionar "+"
    btnAgregarTraje.addEventListener("click", () => {
        const nuevoTraje = document.createElement("div");
        nuevoTraje.classList.add("nombre");
        nuevoTraje.innerHTML = `
            <p class="subtitulo">Nombre traje</p>
            <input type="text">
            <button id="eliminar">-</button>
        `;

        // Insertarlo antes del botón "+"
        registroTrajes.insertBefore(nuevoTraje, btnAgregarTraje.nextSibling);

        // Evento para eliminar el traje
        nuevoTraje.querySelector("#eliminar").addEventListener("click", () => {
            nuevoTraje.remove();
        });
    });
});
