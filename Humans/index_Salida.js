
//*********************************************************************************
// Función para ver y editar Usuario 
//*********************************************************************************

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // El usuario está autenticado, llamar a ver_usuario()
    ver_documento('Usuario',user.email,'userData');
    editar_documento('Usuario',user.email,'userDataEdit');

    let title_page = document.getElementById("title_page");
    title_page.textContent = `${aplicacion} - ${email}`;
    
  } else {
    // El usuario no está autenticado
    console.log('Usuario no autenticado');
  }
});



//*********************************************************************************
// Función para cerrar sesion y salir de la BD 
//*********************************************************************************

function salir_registrar() {
  sale_registra()
  .then(function() {
    // Si todo es exitoso, redirige al usuario
    console.log("sale_registra() OK - Usuario", email);
    window.location.href = "index_Humans.html";    
  })
  .catch(function(error) {
    // Maneja los errores de autenticación aquí
    console.error("sale_registra() NOOK - Usuario:", error);
  });
}

//*********************************************************************************
// Ajuste pantalla
//*********************************************************************************



function ajusta_pantalla2(){

  let body = document.querySelector('body');
  let tableContainer = document.getElementById("tableContainer");

  if (window.matchMedia("(orientation: landscape)").matches) {

    body.style.backgroundImage = "url('images/pergamino_h.png')"; 

    let ancho_img = window.innerHeight * 800 / 673;
    tableContainer.style.height = window.innerHeight * 0.65 + "px";
    tableContainer.style.width  = ancho_img          * 0.65 + "px";

    console.log(`Giro Pantalla a Paisaje OK - ancho_pan:${window.innerWidth} , alto_pan:${window.innerHeight}` );
  }
  else {
    body.style.backgroundImage = "url('images/pergamino_v.png')";

    let alto_img = window.innerWidth * 673 / 800;
    tableContainer.style.height = alto_img           * 0.65 + "px";
    tableContainer.style.width  = window.innerWidth  * 0.65 + "px";

    console.log(`Giro Pantalla a Retrato OK - ancho_pan:${window.innerWidth} , alto_pan:${window.innerHeight}` );
  }

  //tableContainer.style.border = "2px solid red";
  tableContainer.style.overflow = "hidden";
  console.log(`Ajuste contenedor OK - ancho_cont:${tableContainer.offsetWidth } , alto_cont:${tableContainer.offsetHeight}` );

  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;

  tableContainer.addEventListener('mousedown', function(event) {
    isDragging = true;
    startX = event.pageX - this.offsetLeft;
    startY = event.pageY - this.offsetTop;
    scrollLeft = this.scrollLeft;
    scrollTop = this.scrollTop;
  });

  tableContainer.addEventListener('mouseup', function() {
    isDragging = false;
  });

  tableContainer.addEventListener('mousemove', function(event) {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - this.offsetLeft;
    const y = event.pageY - this.offsetTop;
    const walkX = (x - startX) * 3; // Ajusta la velocidad de desplazamiento horizontal
    const walkY = (y - startY) * 3; // Ajusta la velocidad de desplazamiento vertical
    this.scrollLeft = scrollLeft - walkX;
    this.scrollTop = scrollTop - walkY;
  });

  tableContainer.addEventListener('touchstart', function(event) {
    isDragging = true;
    startX = event.touches[0].pageX - this.offsetLeft;
    startY = event.touches[0].pageY - this.offsetTop;
    scrollLeft = this.scrollLeft;
    scrollTop = this.scrollTop;
  });

  tableContainer.addEventListener('touchend', function() {
    isDragging = false;
  });

  tableContainer.addEventListener('touchmove', function(event) {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.touches[0].pageX - this.offsetLeft;
    const y = event.touches[0].pageY - this.offsetTop;
    const walkX = (x - startX) * 3; // Ajusta la velocidad de desplazamiento horizontal
    const walkY = (y - startY) * 3; // Ajusta la velocidad de desplazamiento vertical
    this.scrollLeft = scrollLeft - walkX;
    this.scrollTop = scrollTop - walkY;
  });

};

window.addEventListener('DOMContentLoaded', function() { //cuando cargue la panalla
  ajusta_pantalla2();// "tableContainer", );
});

window.addEventListener('resize', function() { //cuando rote la panalla
  ajusta_pantalla2();//
});

