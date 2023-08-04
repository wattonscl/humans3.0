/******************************************/
/**  Parametros                          **/
/******************************************/

// Obtener el parámetro de la URL (nombre de la colección)
const urlParams = new URLSearchParams(window.location.search);
const collectionName = urlParams.get('collection');

console.log("parametro  collectionName es:", collectionName);

/******************************************/
/**  Botones                          **/
/******************************************/

function ir_a_salida() {
  window.location.href = "index_salida.html"; // Reemplaza con la URL a la que deseas redirigir
}

function ir_a_crear_doc() {
  window.location.href = "doc_crear.html"; // Reemplaza con la URL a la que deseas redirigir
}

/******************************************/
/**  Contenido                          **/
/******************************************/

// Obtener la referencia a la colección
const collectionRef = db.collection(collectionName);

// Obtener todos los documentos de la colección
collectionRef.get().then((querySnapshot) => {
  // Obtener los datos de cada documento
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    // Crear una tarjeta para cada documento
    const card = document.createElement('div');
    card.classList.add('card');

    // Mostrar los campos del documento
    Object.keys(data).forEach((field) => {
      const fieldElement = document.createElement('p');
      fieldElement.innerText = `${field}: ${data[field]}`;
      card.appendChild(fieldElement);
    });

    // Crear el botón EDITAR
    const editButton = document.createElement('button');
    editButton.innerText = 'Editar';
    editButton.addEventListener('click', () => {
      // Redireccionar a B.html con el ID del documento
      window.location.href = `doc_editar.html?collection=${collectionName}&document=${doc.id}`;
    });

    card.appendChild(editButton);

    // Agregar la tarjeta al carrusel
    const carousel = document.getElementById('carousel');
    carousel.appendChild(card);
  });

  // Establecer el estilo del carrusel
  const carousel = document.getElementById('carousel');
  carousel.style.display = 'flex';  // Establece el contenedor como un flex container
  carousel.style.overflowX = 'scroll';  // Permite desplazarse horizontalmente

}).catch(function(error) {
  console.error("Error al leer la coleccion:", error);
  console.log("Error al leer la coleccion ", collectionName);
});;

