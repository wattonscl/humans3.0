
//*********************************************************************************
// Función para cerrar sesion y salir de la BD 
//*********************************************************************************

function salir_registrar() {    window.location.href = "index_Humans.html";

  registra("Humans", "salir")
      .then(function() {
          console.log("salir_registrar - registra - ok ");
          sale_registra().then(function() {
            console.log("sale_registra - ok");
            //window.location.href = "index_Humans.html";
          },function() {
            console.error("sale_registra - error: ", error);
          });
      },function() {
        console.error("salir_registrar - registra - error:", error);
      })
  ;


  
}

function ir_a_misiones() {
  window.location.href = "misiones_ver.html";
}

function escribir_bitacora() {
  registra("Humans", "escribir");
}

function actualiza_usuario() {
  update_usuario("Humans", "actualiza ficha usuario");
}

ver_usuario("Humans", "ver ficha usuario");
