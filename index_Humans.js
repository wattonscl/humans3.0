
function ingresar() {

  // Obtén los valores del formulario
  var email = document.getElementById("id_email").value;
  var password = document.getElementById("id_password").value;

   // Llama a la función registra() del archivo F.js
   ingresa_registra(email, password, "Humans", "ingresa")
   .then(function() {
     // Si todo es exitoso, redirige al usuario a B.HTML
     window.location.href = "misiones_ver.html";
     console.log("Autenticación - signIn ok - log_in: ")
   })
   .catch(function(error) {
     // Maneja los errores de autenticación aquí
     console.error("Error en la autenticación:", error);
   });

}

