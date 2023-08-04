


document.getElementById("solicitud-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  // Obtener los valores de los campos del formulario
  var remitente = document.getElementById("remitente").value;
  var destinatario = document.getElementById("destinatario").value;
  var recurso = document.getElementById("recurso").value;
  var accion = document.getElementById("accion").value;
  var sujeto = document.getElementById("sujeto").value;
  
  // Crear un nuevo documento en la colección "solicitudes"
  solicitudCollection.add({
    remitente: remitente,
    destinatario: destinatario,
    recurso: recurso,
    accion: accion,
    sujeto: sujeto
  }).then(function(docRef) {
    // Redireccionar a B.HTML después de crear el documento
    window.location.href = "doc_ver.html";
  }).catch(function(error) {
    console.error("Error al crear el documento:", error);
  });
});
