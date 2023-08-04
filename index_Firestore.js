//*********************************************************************************
// ID de las BD Firestore de Firebase y declaracion de variables utiles
//*********************************************************************************
 
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

// Obtener una referencia a la colección "solicitudes"
var solicitudCollection = db.collection("Solicitud");

var email = "sin@email"; 

//*********************************************************************************
// Función para guardar en la BD los datos del terminal que ingresa a ella. 
//*********************************************************************************

// Función para registrar la información de autenticación en la colección Bitácora
/*function registra(uid_) {
  // Crear un nuevo registro en la colección Bitacora
  return db.collection("Bitacora").doc().set({
    fechaHora: new Date(),
    uid: uid_
  }).then(function(){
    console.log("registra - ok: ", uid_);
  }).catch((error) => {
    console.error("registra - no ok:", error);
  })}*/

function registra( aplicacion_, accion_ ) {

    console.log( aplicacion_ , accion_ );

    const fechaHoraZ  = new Date().toISOString();
    const fechaHoraCl = new Date().toISOString();

    const userAgent = navigator.userAgent;
    const plataforma = navigator.platform;

    return navigator.geolocation.getCurrentPosition((position) => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        let ubicacion = new firebase.firestore.GeoPoint(latitud, longitud);
        db.collection("Bitacora").doc().set({
            accion: accion_,
            aplicacion: aplicacion_,
            usuario: email,
            fechaHora: fechaHoraZ,
            fechaHoraCl: fechaHoraCl,
            userAgent: userAgent,
            plataforma: plataforma,
            ubicacion: ubicacion
            }).then(() => {
                console.log("Documento creado en la colección Bitacora con ubicación: ", accion_);
            }).catch((error) => {
            db.collection("Bitacora").doc().set({
                accion: accion_,
                aplicacion: aplicacion_,
                usuario: email,
                fechaHora: fechaHoraZ,
                fechaHoraCl: fechaHoraCl,
                userAgent: userAgent,
                plataforma: plataforma
                }).then(() => {
                    console.log("Documento creado en la colección Bitacora sin ubicación: ", accion_);
                }).catch((error) => {
                    console.error("Error al crear documento en la colección Bitacora sin ubicación: ", error);
                });
            });
        }, (error) => {
            console.error("Error al obtener ubicación geográfica:", error);
        });

    // Crear un nuevo registro en la colección Bitacora
    /*return db.collection("Bitacora").doc().set({
      fechaHora: new Date().toISOString(),
      uid: "test 1",
      
    }).then(function(){
      console.log("registra2 - set ok ");
    }).catch((error) => {
      console.error("registra2 - set no ok:", error);
    })*/  
  }

//*******************************************************************
// Función para acceder sin Google a la BD
//*******************************************************************

function ingresa_registra(email_, password_, aplicacion_, accion_) { 

    return auth.signInWithEmailAndPassword(email_, password_)
    .then((userCredential) => {
                console.log("Autenticación - signIn1 ok: ", userCredential.user);
                  // Llama a la función registra() del archivo F.js
                //registra(userCredential.uid)
                registra(aplicacion_, accion_)
                .then(() => {
                    console.log("Autenticación - signIn2 ok: ");
                    // Si todo es exitoso, redirige al usuario a B.HTML
                    window.location.href = "misiones_ver.html";
                })
                .catch(function(error) {
                    // Maneja los errores de autenticación aquí
                    console.error("Error en la autenticación:", error);
                });
                })
    .catch((error) => {
    // Si el usuario no existe, crear un nuevo usuario y autenticarlo
    if (error.code === "auth/user-not-found") {
                firebase.auth().createUserWithEmailAndPassword(email_, password_)
                .then((userCredential) => {
                          console.log("Autenticación - createUser1 ok : ", userCredential.user);
                          registra(aplicacion_, accion_)
                                .then(() => {
                                    console.log("Autenticación - createUser2 ok: ", userCredential.user);
                                        // Si todo es exitoso, redirige al usuario a B.HTML
                                        window.location.href = "misiones_ver.html";
                                    })
                                    .catch(function(error) {
                                        // Maneja los errores de autenticación aquí
                                        console.error("Error en la autenticación:", error);
                                });
                })
                .catch((error) => {
                          console.error("Autenticación - createUser error: ", error);
                });
    } });

}

function ver_usuario(aplicacion_, accion_) {

    registra(aplicacion_, accion_);
    
    const user = firebase.auth().currentUser;                       // Obtener el usuario autenticado actualmente
    const userDocRef = db.collection('USUARIO').doc(user.email);    // Obtener una referencia al documento del usuario en Firestore

    userDocRef.get()                                                // Mostrar los datos del usuario
      .then(doc => {
        if (doc.exists) {
          const userData = doc.data();
          document.getElementById('userData').innerText = JSON.stringify(userData);
        } else {
          console.log('El documento del usuario no existe');
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos del usuario:', error);
      });
};

function update_usuario(aplicacion_, accion_) {

  registra(aplicacion_, accion_);

  const docData = {
        stringExample: "Hello world!",
        booleanExample: true,
        numberExample: 3.14159265,
        dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
        arrayExample: [5, true, "hello"],
        nullExample: null,
        objectExample: {
            a: 5,
            b: {
                nested: "foo"
            }
        }
  }
  
  const user = firebase.auth().currentUser;                       // Obtener el usuario autenticado actualmente

  // Utilizar el email del usuario como ID del documento
  db.collection('USUARIO').doc(user.email).set(docData)
  .then(() => {
    console.log('Documento creado exitosamente');
  })
  .catch(error => {
    console.error('Error al crear el documento:', error);
  });
};


function sale_registra() {

return auth.signOut()
    .then(() => {
      console.log("signOut - ok");
      })
    .catch((error) => {
      // Aquí puedes manejar cualquier error que ocurra durante la ejecución de la función anterior
      console.error("signOut - error: ", error);
      });
}

// Función que lee datos desde Firestore
function doc_leer() {
  return new Promise((resolve, reject) => {
    // Acceder a una colección y documento específicos
    const coleccion = firebase.firestore().collection("Bitacora");
    const documento = coleccion.doc("DfWzXn3loLgdPH9squ3v");

    // Obtener los datos del documento
    documento
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const datos = snapshot.data();
          resolve(datos);
        } else {
          reject("El documento no existe");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

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
  
/*export function registrar_bitacora( accion_, aplicacion_, email_) {

    return new Promise((resolve, reject) => { 
            // Aquí puedes realizar cualquier tarea que necesites antes de la redirección
            console.log( accion_ );

            let email = email_;

            const fechaHoraZ = new Date().toISOString();
            const fechaHoraCl = new Date().toISOString();

            const userAgent = navigator.userAgent;
            const plataforma = navigator.platform;

            let ubicacion;

            navigator.geolocation.getCurrentPosition((position) => {
                const latitud = position.coords.latitude;
                const longitud = position.coords.longitude;
                ubicacion = new firebase.firestore.GeoPoint(latitud, longitud);
                db.collection("Bitacora").doc().set({
                    accion: accion_,
                    aplicacion: aplicacion_,
                    usuario: email,
                    email_: email_,
                    fechaHora: fechaHoraZ,
                    fechaHoraCl: fechaHoraCl,
                    userAgent: userAgent,
                    plataforma: plataforma,
                    ubicacion: ubicacion
                    }).then(() => {
                        console.log("Documento creado en la colección Bitacora con ubicación: ", accion_);
                        resolve();
                    }).catch((error) => {
                    db.collection("Bitacora").doc().set({
                        accion: accion_,
                        aplicacion: aplicacion_,
                        usuario: email,
                        email_: email_,
                        fechaHora: fechaHoraZ,
                        fechaHoraCl: fechaHoraCl,
                        userAgent: userAgent,
                        plataforma: plataforma
                        }).then(() => {
                            console.log("Documento creado en la colección Bitacora sin ubicación: ", accion_);
                            resolve();
                        }).catch((error) => {
                            console.error("Error al crear documento en la colección Bitacora sin ubicación: ", error);
                            reject(new Error('Error al crear documento en la colección Bitacora sin ubicación'));
                        });
                    });
                }, (error) => {
                    console.error("Error al obtener ubicación geográfica:", error);
                    reject(new Error('Error al obtener ubicación geográfica'));
                });
      });
}

*/