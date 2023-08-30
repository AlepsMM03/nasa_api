window.addEventListener('load', obtenerFotosNASA);

function obtenerFotosNASA() {
    const ruta = 'https://images-api.nasa.gov/search?q=apollo%2011&media_type=image'; // URL de búsqueda de ejemplo
    const apiKey = 'rhyvgZUUTXrtNMFjFisAhte3a0Ud7wQYv9xN9AGs'; // Reemplazar con tu clave de API

    fetch(ruta, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(respuesta => respuesta.json())
    .then(resultado => {
        console.log(resultado); // Imprimir la respuesta en la consola
        mostrarFotos(resultado.collection.items);
    })
    .catch(error => {
        console.error('Error al obtener fotos:', error);
    });
}

function mostrarFotos(fotos) {
    const contenido = document.getElementById('contenido');
    contenido.innerHTML = '';

    fotos.forEach(foto => {
        const data = foto.data[0];

        const titulo = document.createElement('h2');
        titulo.textContent = data.title;

        const descripcion = document.createElement('p');
        descripcion.textContent = data.description;

        const mediaType = data.media_type;

        if (mediaType === "image") {
            const imagen = document.createElement('img');
            const imageUrl = foto.links[0].href; // Obtener la URL de la imagen
            imagen.src = imageUrl;
            imagen.alt = data.title;
            imagen.classList.add('img-fluid', 'mt-3');
            contenido.appendChild(imagen);
        } else if (mediaType === "video") {
            const video = document.createElement('video');
            const videoUrl = foto.links[0].href; // Obtener la URL del video
            video.src = videoUrl;
            video.controls = true;
            video.classList.add('img-fluid', 'mt-3');
            contenido.appendChild(video);
        }

        contenido.appendChild(titulo);
        contenido.appendChild(descripcion);

        const hr = document.createElement('hr');
        contenido.appendChild(hr);
    });
}
