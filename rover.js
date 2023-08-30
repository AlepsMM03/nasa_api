window.addEventListener('load', obtenerFotosMarte);

// Agrega tu clave de API aquí
const API_KEY = 'rhyvgZUUTXrtNMFjFisAhte3a0Ud7wQYv9xN9AGs';

function obtenerFotosMarte() {
    const buscarBtn = document.querySelector('#buscar-btn');
    buscarBtn.addEventListener('click', buscarFotoPorFecha);

    cargarFotos();
}

function cargarFotos() {
    const fecha = '2014-3-3';
    const ruta = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${fecha}&api_key=${API_KEY}`;

    fetch(ruta)
    .then(respuesta => respuesta.json())
    .then(resultado => mostrarFotos(resultado.photos))
    .catch(error => {
        console.error('Error al obtener fotos:', error);
    });
}

function buscarFotoPorFecha() {
    const fechaInput = document.querySelector('#fecha-input').value;
    if (fechaInput) {
        const ruta = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${fechaInput}&api_key=${API_KEY}`;

        fetch(ruta)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarFotos(resultado.photos))
        .catch(error => {
            console.error('Error al buscar foto:', error);
        });
    } else {
        console.log('Ingrese una fecha válida.');
    }
}

function mostrarFotos(photos) {
    const contenido = document.getElementById('contenido');
    contenido.innerHTML = '';

    if (photos.length > 0) {
        const photo = photos[0];
        
        const titulo = document.createElement('h2');
        titulo.textContent = `Foto de ${photo.rover.name}`;
        
        const fecha = document.createElement('p');
        fecha.textContent = `Fecha: ${photo.earth_date}`;
        
        const camera = document.createElement('p');
        camera.textContent = `Cámara: ${photo.camera.full_name}`;
        
        const imagen = document.createElement('img');
        imagen.src = photo.img_src;
        imagen.alt = 'Foto de Marte';
        imagen.classList.add('img-fluid', 'mt-3');
        
        contenido.appendChild(titulo);
        contenido.appendChild(fecha);
        contenido.appendChild(camera);
        contenido.appendChild(imagen);
    } else {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No se encontraron fotos para esta fecha en Marte.';
        contenido.appendChild(mensaje);
    }
}
// Obtener la fecha actual en formato YYYY-MM-DD
const today = new Date();
today.setHours(0, 0, 0, 0);

// Obtener el elemento input
const fechaInput = document.getElementById('fecha-input');

// Establecer el atributo "max" del input a la fecha actual
fechaInput.setAttribute('max', today.toISOString().split('T')[0]);