// En est archivo vamos a definir nuestro metodos de autentificacion

// Aca requerimos el metodo passport
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

// Aca requermimos el archivo database
const pool = require("../database");

const helpers = require("../lib/helpers");
const { route } = require("../routes/authentication");

// Aca vamos a crear nuestras autentificaciones
// Primero definimos el nombre de nuestra autentificacion
// luego colocamos la intancia




// LOGUIN
passport.use("local.loguin", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) => {
    // Aca imprimimos lo que estamos recibiendo atraves del body y lo que se esta recibiendo
    // atraves del campo username y password
    // console.log(req.body);
    // console.log(username);
    // console.log(password);


    // Aca vamos hacer una consulta a la bd
    const rows = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

    // Aca hacemos una condcional
    // Si encuentra un usuario entonces...
    if (rows.length > 0) {
        // Aca guardamos el usuario
        const user = rows[0];

        // Aca hacemos validacion de contraseña
        // Aca hacemos una validacion de la contraseña que esta guarda en la base de datos
        // con la que me esta pasando el formulario
        const validPassword = await helpers.loguinPassword(password, user.password);

        // Aca hacemos una condicional
        // Si el los datos son correctos entonces...
        if (validPassword) {
            // Aca le decimos que si los datos son correctos nos muestre un mensaje
            done(null, user, req.flash("success", "Bienvenido " + user.username));

            // Si los datos no son correctos entonces...
        } else {
            // Aca le decimos que si la contraseña no es correcta nos muestre un mensaje
            done(null, false, req.flash("message", "Contraseña incorrecta " + user.username));
        }


        // Si no se encuentra un usuario entonces...
    } else {
        // Aca le decimos que si no existe el usuario nos muestre un mensaje
        return done(null, false, req.flash("message", "El Usuario no existe"));
    }
}));




// REGISTRO
passport.use("local.signup", new LocalStrategy({
    // Aca vamos a colocar lo que queremos recibir
    usernameFiel: "username",
    passwordFile: "password",
    // Esto lo utilzamos para recibir el objeto reqs dentro de la funcion del localStrategy en caso de que le estemos pidiendo mas campos que no esten estipulados en el formulario de loguin al usuario
    passReqToCallback: true

    // Aca vamos a definir que va hacer el usuario al momento de autentificarse
    // Esto es un callback una funcion que se ejecuta despues de localStrategy
}, async (req, username, password, done) => {
    // console.log(req.body);

    // Este es en caso de que se tengan mas campos que no etsen estipulados
    // y se esten recibiendo desde el reqbody
    const { fullname } = req.body;

    const newUser = {
        username,
        password,
        fullname
    };

    // Aca vamos a encriptar la contraseña que nos esta llegando del formulario de registro de usuario y la vamos a guardar en el objeto newUser que creamos anteriormente en la variable password
    newUser.password = await helpers.encryptPassword(password);

    // Aca importamos la conexion a la base de datos para que le demos este objeto y lo guarde
    const result = await pool.query("INSERT INTO users SET ?", [newUser]);


    // Aca vamos agregarle el id a nuestro objeto
    newUser.id = result.insertId;

    // Aca le decimos que nos retorne el callback done para que continue
    // y le damos un null para cuando no haya ningun error y el newUser para que lo almacene en una sesion
    return done(null, newUser);

    // Aca estamos imprimiendo el redultado de la incercion a la bd
    // console.log(result);
}));


// Aca guardamos la sesion
passport.serializeUser((user, done) => {
    // Aca le damos un un callback con el user para que guarde la sesion
    done(null, user.id);
});



// aca estamos haciendo la deserializacion
passport.deserializeUser(async (id, done) => {
    // Aca hacemos una consulta a la bd para saber si este usuario si existe
    // Una ves termine lo guardamos en una variable llamada rows
    const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

    // Aca le damos un callback para que nos retorne el arreglo con el objeto 0
    done(null, rows[0]);
});