window.addEventListener('load', obtenerDatos);

function obtenerDatos() {
    const Nasa_api = 'rhyvgZUUTXrtNMFjFisAhte3a0Ud7wQYv9xN9AGs';
    const ruta = `https://api.nasa.gov/planetary/apod?api_key=${Nasa_api}`;

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
        const Nasa_api = 'rhyvgZUUTXrtNMFjFisAhte3a0Ud7wQYv9xN9AGs';
        const ruta = `https://api.nasa.gov/planetary/apod?api_key=${Nasa_api}&date=${fechaInput}`;

        fetch(ruta)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarDatos(resultado))
        .catch(error => {
            console.error('Error al buscar foto:', error);
        });
    } else {
        console.log('Ingrese una fecha válida.');
    }
}

function mostrarDatos({date, explanation, media_type, title, url}){
     
    const titulo = document.querySelector('#titulo');
    titulo.innerHTML = title;
    const fecha = document.querySelector('#fecha');
    fecha.innerHTML = date;
    const descripcion = document.querySelector('#descripcion');
    descripcion.innerHTML = explanation;
    const multimedia = document.querySelector('#c_multimedia');
    if(media_type == 'video'){
        multimedia.innerHTML = `<iframe class="embed-responsive-item" src="${url}"></iframe>`
    } else {
        multimedia.innerHTML = `<img src="${url}" class="img-fluid" alt="${url}">`
    }
}