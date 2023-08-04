

 /***********************************************
 VER BITACORA
 ***********************************************/;

// Lee todos los documentos de la colección "Bitacora"
db.collection('Bitacora').get().then((querySnapshot) => {
  const bitacoraSwiperWrapper = document.querySelector('.bitacora-swiper .swiper-wrapper');

  querySnapshot.forEach((doc) => {
    // Aquí puedes obtener los datos de cada documento
    const data = doc.data();

    // Crea un nuevo slide para el carrusel de Bitacora
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

   

    // Agrega la imagen del documento al slide
    const image = document.createElement('img');
    image.src = "images/icon.png";
    slide.appendChild(image);

    // Agrega el botón "más información" al slide
    const button = document.createElement('button');
    button.textContent = `Más información - Fecha Hora: ${data.fechaHora}`;
    slide.appendChild(button);

     
    const textnode = document.createTextNode("Este es un primer texto libre");
    slide.appendChild(textnode);

    // Agrega el slide al carrusel de Bitacora
    bitacoraSwiperWrapper.appendChild(slide);
  });

  // Inicializa el carrusel de Bitacora
  new Swiper('.bitacora-swiper', {
    direction: "horizontal",
    loop: true,
    slidesPerView: 5,
    spaceBetween: 30,
    centeredSlides: true,
    grabCursor: true,
  });
});

/***********************************************
 VER MISION
 ***********************************************/;

// Lee todos los documentos de la colección "Mision"
db.collection('Mision').get().then((querySnapshot) => {
  const misionSwiperWrapper = document.querySelector('.mision-swiper .swiper-wrapper');

  querySnapshot.forEach((doc) => {
    // Aquí puedes obtener los datos de cada documento
    const data = doc.data();

    // Crea un nuevo slide para el carrusel de Mision
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    // Agrega la imagen del documento al slide
    const image = document.createElement('img');
    //image.src = data.imagen;
    image.src = "images/icon.png";
    slide.appendChild(image);

    // Agrega el botón "más información" al slide
    const button = document.createElement('button');
    button.textContent = `Más información - Nombre: ${data.nombre}`;
    slide.appendChild(button);

    // Agrega el slide al carrusel de Mision
    misionSwiperWrapper.appendChild(slide);
  });

  // Inicializa el carrusel de Mision
  new Swiper('.mision-swiper', {
    direction: "horizontal",
    loop: true,
    slidesPerView: 5,
    spaceBetween: 30,
    centeredSlides: true,
    grabCursor: true,
    
  });
});

function ir_a_ver_doc_s() {
  window.location.href = "doc_ver.html?collection=Solicitud"; // Reemplaza con la URL a la que deseas redirigir
}

function ir_a_ver_doc_b() {
  window.location.href = "doc_ver.html?collection=Bitacora"; // Reemplaza con la URL a la que deseas redirigir
}

function ir_a_ver_doc_m() {
  window.location.href = "doc_ver.html?collection=Mision"; // Reemplaza con la URL a la que deseas redirigir
}

function ir_a_ver2_doc_s() {
  window.location.href = "doc_ver2.html?collection=Solicitud"; // Reemplaza con la URL a la que deseas redirigir
}

function ir_a_ver2_doc_b() {
  window.location.href = "doc_ver2.html?collection=Bitacora"; // Reemplaza con la URL a la que deseas redirigir
}

function ir_a_ver2_doc_m() {
  window.location.href = "doc_ver2.html?collection=Mision"; // Reemplaza con la URL a la que deseas redirigir
}

function ir_a_logout() {
  window.location.href = "index_salida.html"; // Reemplaza con la URL a la que deseas redirigir
}

function ir_a_crear_doc() {
  window.location.href = "doc_crear.html"; // Reemplaza con la URL a la que deseas redirigir
}

