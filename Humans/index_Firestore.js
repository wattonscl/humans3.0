//*********************************************************************************
// ID de las BD Firestore de Firebase y declaracion de variables utiles
//*********************************************************************************

//willy
// Aquí debes colocar las credenciales de tu proyecto de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDENGMryDcniD1O9UNSAB81tLWTLaSo3PY",
    authDomain: "forms-on-firebase.firebaseapp.com",
    projectId: "forms-on-firebase",
    storageBucket: "forms-on-firebase.appspot.com",
    messagingSenderId: "238819843589",
    appId: "1:238819843589:web:10dc3cae9e9cd45ddc466c",
    measurementId: "G-TRXWZM6FB1"
};

firebase.initializeApp(firebaseConfig);

const db    = firebase.firestore();
const auth  = firebase.auth();

let email               = "sin@email";
let aplicacion          = "sin_aplicacion";

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // El usuario está autenticado....
    email = user.email;
    aplicacion = "Humans";
    console.log( `Usuario autenticado OK - aplicación:${aplicacion} , email:${email}` );
    }
   else {
    // El usuario NO está autenticado....
    email               = "sin@email";
    aplicacion          = "sin_aplicacion";
    console.log( `Usuario autenticado NOOK - aplicación:${aplicacion} , email:${email}` );
  }
});

//*******************************************************************
// INGRESO - SALIDA
//*******************************************************************

function ingresa_registra(email_, password_, aplicacion_) {
  
  return auth
    .signInWithEmailAndPassword(email_, password_)
    .then((userCredential) => {
      email = email_;
      aplicacion = aplicacion_;
      console.log(`SignInWithEmailAndPassword OK - aplicación:${aplicacion} , email:${email}`);
      return crea_documento_autoID("Bitacora", {accion: "Ingresa Usuario registrado OK"});
    })
    .catch((error) => {
      console.error("SignInWithEmailAndPassword NOOK: ", error);
      // Si el usuario no existe, crear un nuevo usuario y autenticarlo
      if (error.code === "auth/user-not-found") {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(email_, password_)
          .then((userCredential) => {
            console.log(`CreateUserWithEmailAndPassword OK - userCredential.user:${userCredential.user}`);
            email = email_;
            aplicacion = aplicacion_;
            
            return crea_documento_autoID("Bitacora", {accion: "Ingresa Usuario nuevo OK"})
              .then(()=>{
              return crea_documento_ID("Usuario", {email:email , aplicacion:aplicacion} , email);
              })
              .catch((error) => {
                console.error("crea_documento_autoID NOOK : ", error);
                throw error;
              });
          })
          .catch((error) => {
            console.error("CreateUserWithEmailAndPassword NOOK : ", error);
            throw error;
          });
      }
      throw error; // Lanza el error para que pueda ser capturado por el siguiente "catch"
    });
}

function sale_registra() {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    
    if (user) {
      console.log("Usuario autenticado, se desconectará: ", email);
      
      auth.signOut()
        .then(() => {
          console.log("SignOut OK - Usuario:", email);
          resolve();
        })
        .catch((error) => {
          console.error("SignOut NOOK - Usuario:", error);
          reject(error);
        });
    } else {
      console.log("Usuario NO autenticado, NO se desconectará: ", email);
      resolve();
    }
  });
}

//*********************************************************************************
// CREAR - VER - EDITAR
//*********************************************************************************

function crea_documento_autoID(coleccion_, datos_) {

  //console.log(aplicacion, accion_);

  const fechaHoraZ_N      = new Date();
  const fechaHoraZ        = fechaHoraZ_N.toISOString();
  const timeZone          = Intl.DateTimeFormat().resolvedOptions().timeZone;   // Obtener la zona horaria del navegador del usuario
  const fechaHoraUsuario  = fechaHoraZ_N.toLocaleString("en-US", { timeZone });  // Obtener la fecha y hora actual en la zona horaria del usuario

  const userAgent = navigator.userAgent;
  const plataforma = navigator.platform;

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition( (position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        let ubicacion = new firebase.firestore.GeoPoint(latitud, longitud);
        db.collection(coleccion_)
          .doc()
          .set({
            aplicacion: aplicacion,
            usuario: email,
            
            fechaHora_N: fechaHoraZ_N,
            fechaHora: fechaHoraZ,
            fechaHoraUsuario: fechaHoraUsuario,

            userAgent: userAgent,
            plataforma: plataforma,

            ubicacion: ubicacion,

            ...datos_
          })
          .then(() => {
            console.log( `Crea Documento OK - con ubicación , coleccion: ${coleccion_} , datos:${JSON.stringify(datos_)}` );
            resolve(); // Resuelve la promesa después de completar la operación
          })
          .catch((error) => {
            db.collection(coleccion_)
              .doc()
              .set({
                aplicacion: aplicacion,
                usuario: email,
                
                fechaHora_N: fechaHoraZ_N,
                fechaHora: fechaHoraZ,
                fechaHoraUsuario: fechaHoraUsuario,

                userAgent: userAgent,
                plataforma: plataforma,

                //ubicacion: ubicacion,

                ...datos_
              })
              .then(() => {
                console.log( `Crea Documento OK - sin ubicación, coleccion: ${coleccion_}  , datos:${JSON.stringify(datos_)}` );
                resolve(); // Resuelve la promesa después de completar la operación
              })
              .catch((error) => {
                console.error( `Crea Documento NOOK - sin ubicación, coleccion: ${coleccion_}  , datos:${JSON.stringify(datos_)} , error:${error} `);
                reject(error); // Rechaza la promesa en caso de error
              });
          });
      },
      (error) => {
        console.error(`Lee Ubicación Geo NOOK - coleccion: ${coleccion_}  , datos:${JSON.stringify(datos_)} , error:${error}`);
        reject(error); // Rechaza la promesa en caso de error
      }
    );
  });
}

function crea_documento_ID(coleccion_, datos_, id_) {

  //console.log(aplicacion, accion_);

  const fechaHoraZ_N      = new Date();
  const fechaHoraZ        = fechaHoraZ_N.toISOString();
  const timeZone          = Intl.DateTimeFormat().resolvedOptions().timeZone;   // Obtener la zona horaria del navegador del usuario
  const fechaHoraUsuario  = fechaHoraZ_N.toLocaleString("en-US", { timeZone });  // Obtener la fecha y hora actual en la zona horaria del usuario

  const userAgent = navigator.userAgent;
  const plataforma = navigator.platform;

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition( (position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        let ubicacion = new firebase.firestore.GeoPoint(latitud, longitud);
        db.collection(coleccion_)
          .doc( id_ )
          .set({
            aplicacion: aplicacion,
            usuario: email,
            
            fechaHora_N: fechaHoraZ_N,
            fechaHora: fechaHoraZ,
            fechaHoraUsuario: fechaHoraUsuario,

            userAgent: userAgent,
            plataforma: plataforma,

            ubicacion: ubicacion,

            ...datos_
          })
          .then(() => {
            console.log( `Crea Documento OK - con ubicación , coleccion: ${coleccion_} , datos:${JSON.stringify(datos_)}` );
            resolve(); // Resuelve la promesa después de completar la operación
          })
          .catch((error) => {
            db.collection(coleccion_)
              .doc( id_ )
              .set({
                aplicacion: aplicacion,
                usuario: email,
                
                fechaHora_N: fechaHoraZ_N,
                fechaHora: fechaHoraZ,
                fechaHoraUsuario: fechaHoraUsuario,

                userAgent: userAgent,
                plataforma: plataforma,

                //ubicacion: ubicacion,

                ...datos_
              })
              .then(() => {
                console.log( `Crea Documento OK - sin ubicación, coleccion: ${coleccion_}  , datos:${JSON.stringify(datos_)}` );
                resolve(); // Resuelve la promesa después de completar la operación
              })
              .catch((error) => {
                console.error( `Crea Documento NOOK - sin ubicación, coleccion: ${coleccion_}  , datos:${JSON.stringify(datos_)} , error:${error} `);
                reject(error); // Rechaza la promesa en caso de error
              });
          });
      },
      (error) => {
        console.error(`Lee Ubicación Geo NOOK - coleccion: ${coleccion_}  , datos:${JSON.stringify(datos_)} , error:${error}`);
        reject(error); // Rechaza la promesa en caso de error
      }
    );
  });
}

function ver_documento(coleccion_,documentoId_, elementById_ ) {

    const userDocRef = db.collection(coleccion_).doc(documentoId_);    // Obtener una referencia al documento del usuario en Firestore
    return userDocRef.get()                                                // Mostrar los datos del usuario
      .then(doc => {
        if (doc.exists) {
          const userData = doc.data();
          //document.getElementById('userData').innerText = JSON.stringify(userData);
          const userDataElement = document.getElementById(elementById_);

          const ul = document.createElement('ul');
          for (const key in userData) {
            const li = document.createElement('li');
            const label = document.createElement('span');
            label.innerHTML = '<strong>' + key + ':</strong> ';
            const value = document.createElement('span');
            //value.innerText = JSON.stringify(userData[key]).substring(0,50);
            value.innerText = userData[key];

            li.appendChild(label);
            li.appendChild(value);
            ul.appendChild(li);
          }
          
          userDataElement.innerHTML = '';
          userDataElement.appendChild(ul);
      
        console.log('Lee OK - Documento Usuario:', email);
        return crea_documento_autoID("Bitacora", {accion: "Ver Usuario - OK"});
        } else {
          //crea_usuario();
          crea_documento_autoID("Usuario", {email:email , aplicacion:aplicacion});
          return crea_documento_autoID("Bitacora", {accion: "Ver Usuario - NO Existe - se crea OK"});
        }
      })
      .catch(error => {
        console.error('Lee NOOK - Documento Usuario:', error);
      });
};

function editar_documento(coleccion_, documentoId_, elementById_) {
  const userDocRef = db.collection(coleccion_).doc(documentoId_);
  return userDocRef.get()
    .then(doc => {
      if (doc.exists) {
        const userData = doc.data();
        const userDataElement = document.getElementById(elementById_);

        const ul = document.createElement('ul');
        for (const key in userData) {
          const li = document.createElement('li');
          const label = document.createElement('span');
          label.innerText = key;
          const separator = document.createElement('span');
          separator.innerText = ': ';
          const input = document.createElement('input');
          input.type = 'text';
          input.value = userData[key];

          li.appendChild(label);
          li.appendChild(separator);
          li.appendChild(input);
          ul.appendChild(li);
        }

        const saveButtonContainer = document.createElement('div');
        saveButtonContainer.style.textAlign = 'center'; // Centra el contenido

        const saveButton = document.createElement('button');
        saveButton.innerText = 'Guardar cambios';
        saveButton.addEventListener('click', () => {
          const updatedData = {};
          const lis = ul.getElementsByTagName('li');
          for (let i = 0; i < lis.length; i++) {
            const label = lis[i].getElementsByTagName('span')[0];
            const input = lis[i].getElementsByTagName('input')[0];
            const key = label.innerText;
            const value = input.value;
            updatedData[key] = value;
          }
          userDocRef.update(updatedData)
            .then(() => {
              console.log(`Cambios guardados OK - coleccion: ${coleccion_} , documento: ${documentoId_} , datos:${JSON.stringify(updatedData)}`);
              ver_documento('Usuario',email,'userData')
                .then(()=> {
                  return crea_documento_autoID("Bitacora", { accion: "Guardar Cambios - OK" });
              }).catch(error => {
                console.error('Error al guardar los cambios:', error);
                throw error;
              });})
            .catch(error => {
              console.error('Error al guardar los cambios:', error);
              return crea_documento_autoID("Bitacora", { accion: "Guardar Cambios - NOOK" });
            });
        });

        saveButtonContainer.appendChild(saveButton);

        userDataElement.innerHTML = '';
        userDataElement.appendChild(ul);
        userDataElement.appendChild(saveButtonContainer);

        console.log('Documento leído correctamente:', documentoId_);
        return crea_documento_autoID("Bitacora", { accion: "Editar Documento - OK" });
      } else {
        console.log('El documento no existe:', documentoId_);
        crea_usuario();
        return crea_documento_autoID("Bitacora", { accion: "Editar Documento - NO Existe - se crea OK" });
      }
    })
    .catch(error => {
      console.error('Error al leer el documento:', error);
    });
}

//*********************************************************************************
// Ajuste pantalla
//*********************************************************************************

function ajusta_pantalla(){

  let body = document.querySelector('body');
  let tableContainer = document.getElementById(tableContainer);

  if (window.matchMedia("(orientation: landscape)").matches) {

    body.style.backgroundImage = 'url('+urlImagenHorizontal_+')';

    let ancho_img = window.innerHeight * 800 / 673;
    tableContainer.style.height = window.innerHeight * 0.65 + "px";
    tableContainer.style.width  = ancho_img          * 0.65 + "px";

    console.log(`Giro Pantalla a Paisaje OK - ancho_pan:${window.innerWidth} , alto_pan:${window.innerHeight}` );
  }
  else {
    body.style.backgroundImage = 'url('+urlImagenVertical_+')';

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

//*******************************************************************
// Función para acceder con Google a la BD
//*******************************************************************

/*export function acceder_sin_google() {

    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    email_aux = email;

   // Autenticar usuario con Firebase Authentication
   auth.signInWithEmailAndPassword(email, password)
   .then((userCredential) => {
     console.log("Usuario ingresado ok:", userCredential.user);
               registrar_bitacora("Ingresó a la BD","Humans"); //, userCredential.user
               window.location.href = "index_salida.html"; // misiones_ver.html Reemplaza con la URL a la que deseas redirigir
               })
   .catch((error) => {
   // Si el usuario no existe, crear un nuevo usuario y autenticarlo
   if (error.code === "auth/user-not-found") {
               firebase.auth().createUserWithEmailAndPassword(email, password)
               .then((userCredential) => {
                           console.log("Usuario creado ok:", userCredential.user);
                           acceder_sin_google(); //
               })
               .catch((error) => {
                           console.error("Error al crear usuario:", error);
               });
   } else {
               console.error("Error al autenticar usuario:", error);
   }
   });
}*/

  // Autenticar usuario con Firebase Authentication
  