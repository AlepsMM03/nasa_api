window.addEventListener('load', obtenerDatos);

function obtenerDatos() {
    const API_KEY = 'rhyvgZUUTXrtNMFjFisAhte3a0Ud7wQYv9xN9AGs';
    const ruta = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

    fetch(ruta)
    .then(respuesta => respuesta.json())
    .then(resultado => mostrarDatos(resultado))

    // Agregar evento al botón de búsqueda
    const buscarBtn = document.querySelector('#buscar-btn');
    buscarBtn.addEventListener('click', buscarFotoPorFecha);

}

function buscarFotoPorFecha() {
    const fechaInput = document.querySelector('#fecha-input').value;
    if (fechaInput) {
        const API_KEY = 'rhyvgZUUTXrtNMFjFisAhte3a0Ud7wQYv9xN9AGs';
        const ruta = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${fechaInput}`;

        fetch(ruta)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarDatos(resultado))
        .catch(error => {
           // console.error('Error al buscar foto:', error);
        });
    } else {
       // console.log('Ingrese una fecha válida.');
    }
}

function mostrarDatos({date, explanation, media_type, title, url}) {
    const titulo = document.querySelector('#titulo');
    if (title) {
        titulo.innerHTML = title;
    } else {
        titulo.innerHTML = "";
    }

    const fecha = document.querySelector('#fecha');
    if (date) {
        fecha.innerHTML = date;
    } else {
        fecha.innerHTML = "";
    }

    const descripcion = document.querySelector('#descripcion');
    if (explanation) {
        descripcion.innerHTML = explanation;
    } else {
        descripcion.innerHTML = "";
    }

    const multimedia = document.querySelector('#c_multimedia');
    
    if (media_type === 'image' && url) {
        multimedia.innerHTML = `<img src="${url}" class="img-fluid" alt="${title || 'Imagen'}">`;
    } else if (media_type === 'video' && url) {
        multimedia.innerHTML = `<iframe class="embed-responsive-item" src="${url}"></iframe>`;
    } else {
        multimedia.innerHTML = `<p>No se encontró una imagen e información para esta fecha. En ese entonces, los astronautas todavía estaban sacando "fotos" con telescopios de cartón.</p>`;
    }
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const fechaInput = document.getElementById('fecha-input');

fechaInput.setAttribute('max', today.toISOString().split('T')[0]);