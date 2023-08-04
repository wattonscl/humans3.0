
function ingresar() {

  // Obtén los valores del formulario
  var email_ = document.getElementById("id_email").value;
  var password_ = document.getElementById("id_password").value;

   // Llama a la función registra() del archivo F.js
   ingresa_registra(email_, password_, "Humans")
   .then(function() {
     // Si todo es exitoso, redirige al usuario a B.HTML
     console.log("ingresa_registra() OK:", email);
     window.location.href = "index_Salida.html";
   })
   .catch(function(error) {
     // Maneja los errores de autenticación aquí
     console.error("ingresa_registra() NOOK:", error);
   });

}

