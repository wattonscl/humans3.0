/******************************************/
/**  Parametros                          **/
/******************************************/

// Obtener los parámetros de la URL (nombre de la colección y ID del documento)
const urlParams = new URLSearchParams(window.location.search);
const collectionName = urlParams.get('collection');
const documentId = urlParams.get('document');

console.log("parametro  collectionName es:", collectionName);
console.log("parametro  documentId es:", documentId);

/******************************************/
/**  Botones                          **/
/******************************************/

function ir_a_doc_ver_sin_guardar() {
  window.location.href = `doc_ver.html?collection=${collectionName}`;
}

/******************************************/
/**  Contenido                          **/
/******************************************/

// Obtener la referencia al documento
const documentRef = db.collection(collectionName).doc(documentId);

// Obtener los campos del documento
documentRef.get().then((doc) => {
  if (doc.exists) {
    const data = doc.data();

    // Mostrar los campos del documento
    Object.keys(data).forEach((field) => {
      // Crear un campo de texto editable
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.value = data[field];

      // Crear un contenedor para el campo de texto y el label
      const fieldContainer = document.createElement('div');
      fieldContainer.classList.add('field-container');

      // Crear y agregar el label al contenedor
      const label = document.createElement('label');
      label.innerText = `${field}: `;
      fieldContainer.appendChild(label);

      // Agregar el campo de texto al contenedor
      fieldContainer.appendChild(inputField);

      // Agregar el contenedor al formulario
      const form = document.getElementById('form');
      form.appendChild(fieldContainer);
    });

    // Crear el botón GUARDAR
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Guardar';
    saveButton.addEventListener('click', () => {
      // Obtener los valores de los campos del formulario
      const form = document.getElementById('form');
      const inputs = form.querySelectorAll('input');
      const updatedData = {};
      inputs.forEach((input) => {
        const fieldName = input.previousSibling.innerText.replace(':', '').trim();
        const fieldValue = input.value;
        updatedData[fieldName] = fieldValue;
      });

      // Actualizar el documento en Firestore
      documentRef.update(updatedData).then(() => {
        // Redireccionar a A.html
        window.location.href = `doc_ver.html?collection=${collectionName}`;
      });
    });

    // Agregar el botón al formulario
    const form = document.getElementById('form');
    form.appendChild(saveButton);
  }
});

