// Inicializamos el modulo de express
const express = require("express");
// Requerimos el modulo morgan
const morgan = require("morgan");
// Requerimos el modulo de colors
const colors = require("colors");
// Requerimos el modulo de handlebars
const exphbs = require("express-handlebars");
// Requerimos el modulo path
const path = require("path");
// Requerimos el modulo connect-flash
const flash = require("connect-flash");
// Requerimos el modulo express-session
const session = require("express-session");
// Aca requerimos el modulo express-mysql-session
const mysqlStore = require("express-mysql-session");
// Aca requerimos el modulo passport
const passport = require("passport")


// Aca requerimos el archivo keys y de el archivo la propiedad database
const { database } = require("./keys")




// Inicializaciones
// Aca va la inicalizacion de la bd y la inicializacion de express
const app = express();

// Aca requerimos el archivo passport el cual nos adyuda a autenticar los usuarios
require("./lib/passport");





// SETTINGS
// Aca ponemos las configuraciones que necita mi servidor de express
app.set("port", process.env.PORT || 5000);
app.set(0);
// Aca le decimos en donde va a estar la carpeta views
app.set("views", path.join(__dirname, "views"));

// Aca configuramos handlebars para que nos funcione correctamente
app.engine('.hbs', exphbs.engine({
    // Aca le decimos que tenemos un archivo por defecto llmado main
    defaultLayout: 'main',
    // El metodo join lo que hace es unir directorios
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    // Aca le configuramos los handlebars para qu entienda que van a terminar en .hbs
    extname: '.hbs',
    // Aca vamos a configurar los helpers que va anececitar handlebars
    helpers: require('./lib/handlebars')
}));
// Aca especificamos la motor de plantillas que vamos a utilizar
app.set("view engine", ".hbs");






// MIDDlEWARES
// Son funciones que se ejecutan cada ves que un ususario hace una peticion al servidor

// Aca configuaramos las sesiones
app.use(session({
    secret: "aplicationNodejs",
    resave: false,
    saveUnitialized: false,
    store: new mysqlStore(database)
}));
app.use(flash());
app.use(morgan("dev"));
// Este metodo funciona para poder aceptar desde los formularios los datos que me envia el usuario
// Utilizamos extended: false para decirle que solo vamos a recibir datos en strings nada de imgs o archivos
app.use(express.urlencoded({ extended: false }));
// Aca vamos a decirle que tambien reciba archivos .json
app.use(express.json());


// aca vamos a inicializar passport para que funcione correctamente con las sesiones
app.use(passport.initialize());
app.use(passport.session());






// VARIABLES GLOVALES
// Variables que mi aplicaion nececita en cualquier parte de mi aplicacion y que no se pueden pasar por parametros o por el req o res de express o de node por ejemplo el usuario que esta logueado en el sistema o el mensaje de error que se va a mostrar en la pantalla
app.use((req, res, next) => {
    // Aca guardamos nuestro valor en una varaible golbal llamda success y message
    // esta nos va ayudar a con las alertas flash
    app.locals.success = req.flash("success");
    app.locals.message = req.flash("message");

    // Aca vamos a obener los datos del usuario
    app.locals.user = req.user;
    next();
});



// RUTAS
// Aca vamos a definir las URLs de nuestro servidor
app.use(require("./routes/"));
app.use(require("./routes/authentication"));
// Aca le decimos que a todas rutas que creemos les preceda un prefijo en este caso /links
app.use('/links', require("./routes/links"));




// PUBLIC
// Aca van los archivos estaticos como imagenes, css, js, etc que no van a cambiar nunca y que no necesitan ser procesados por el servidor de express para que se muestren en el navegador del usuario final como por ejemplo las imagenes de un producto
app.use(express.static(path.join(__dirname, "public")));







// INICIALIZAR SERVIDOR
// Aca vamos inicializar el servidor
// app.listen(app.get("port"), () => {
//     console.log("(っ◔◡◔)っ", "Server on port".rainbow, app.get("port"), "(ง︡'-'︠)ง");
// });


// Aca vamos a inicializar el servidor
app.listen(app.get("port"), function () {
    console.log("(っ◔◡◔)っ", `http://localhost:${this.address().port}`.rainbow, "(ง︡'-'︠)ง");
});





























// Si tuvieron problemas para el logOut y además notaron que se pueden registrar mas de un usuario con el mismo username esta es la solución:
// en./ controllers / auth.controller.js tienen que reemplazar la función logout por esta:
// export const logout = async (req, res, next) => {
//     await req.logout(); //Este es un método de passport
//     res.redirect("/");
// };
// Y para no permitir duplicados de username:
// en./ lib / passport.js :
// passport.use(
//     "local.signup",
//     new LocalStrategy(
//         {
//             usernameField: "username",
//             passwordField: "password",
//             passReqToCallback: true,
//         },
//         async (req, username, password, done) => {
//             const [rows] = await pool.query(
//                 "SELECT * FROM users WHERE username = ?",
//                 [username]
//             );
//             if (rows.length > 0) {
//                 done(null, false, req.flash("message", "The username already exists, please choose other one"))
//             } else {
//                 const { fullname } = req.body;
//                 let newUser = {
//                     fullname,
//                     username,
//                     password,
//                 };
//                 newUser.password = await helpers.encryptPassword(password);
//                 // Saving in the Database
//                 const [result] = await pool.query("INSERT INTO users SET ? ", newUser);
//                 newUser.id = result.insertId;
//                 return done(null, newUser);
//             }
//         }
//     )
// );