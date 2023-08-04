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

// Obtener los documentos de la colección especificada
db.collection(collectionName).get().then((querySnapshot) => {
  const carousel = document.getElementById('carousel');

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    // Crear una tarjeta para cada documento
    const card = document.createElement('div');
    card.classList.add('card');

    // Crear la tabla
    const table = document.createElement('table');
    table.style.marginLeft = 'auto'; // Alinear horizontalmente al centro
    table.style.marginRight = 'auto'; // Alinear horizontalmente al centro
    table.style.width = '70%';

    // Incluye titulo de tarjeta
    const salto1 = document.createElement('p');
    salto1.innerText = ".";
      card.appendChild(salto1);
    const salto2 = document.createElement('p');
    salto2.innerText = ".";
        card.appendChild(salto2);
    const tituloElement = document.createElement('p');
    tituloElement.innerText = doc.id;
      card.appendChild(tituloElement);

    // Mostrar los campos del documento en la tabla
    Object.keys(data).forEach((field) => {
      const row = document.createElement('tr');

      // Columna para el nombre del campo
      const fieldNameCell = document.createElement('td');
      const fieldNameElement = document.createElement('strong');
      fieldNameElement.innerText = field;
      fieldNameElement.style.fontSize = '10px';
      fieldNameElement.style.fontFamily = 'Gothic, sans-serif';
      fieldNameCell.appendChild(fieldNameElement);
      fieldNameCell.style.textAlign = 'left';
      row.appendChild(fieldNameCell);

      // Columna para el ":" intermedio
      const colonCell = document.createElement('td');
      colonCell.innerText = ':';
      colonCell.style.fontSize = '10px';
      colonCell.style.fontFamily = 'Gothic, sans-serif';
      row.appendChild(colonCell);

      // Columna para el valor del campo
      const fieldValueCell = document.createElement('td');
      const fieldValueElement = document.createElement('span');
      fieldValueElement.innerText = data[field];
      fieldValueElement.style.fontSize = '10px';
      fieldValueElement.style.fontFamily = 'Gothic, sans-serif';
      fieldValueCell.appendChild(fieldValueElement);
      fieldValueCell.style.textAlign = 'left';
      row.appendChild(fieldValueCell);

      // Agregar la fila a la tabla
      table.appendChild(row);
    });

    // Agregar la tabla al contenedor de la tarjeta
    card.appendChild(table);
    card.style.justifyContent = 'flex-start'; // Alinear verticalmente al medio

    // Crear el contenedor del botón EDITAR
    const editButtonContainer = document.createElement('div');
    editButtonContainer.classList.add('edit-button-container');

    // Crear el botón EDITAR
    const editButton = document.createElement('button');
    editButton.innerText = 'Editar';
    editButton.addEventListener('click', () => {
      // Redireccionar a B.html con el ID del documento
      window.location.href = `doc_editar.html?collection=${collectionName}&document=${doc.id}`;
    });

    // Agregar el botón al contenedor
    editButtonContainer.appendChild(editButton);
    card.appendChild(editButtonContainer);

    carousel.appendChild(card);
  });
}).catch(function(error) {
  console.error("Error al leer la coleccion:", error);
  console.log("Error al leer la coleccion ", collectionName);
});;

