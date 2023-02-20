// Aca vamos hacer la auntenticacion del ususario

// Aca vamos almacenar todas las rutas principales de nuestra aplicacion

// Requerimos express para crear nuestras rutas
const express = require("express");
// Aca importamos un metodo de express
const router = express.Router();

// Aca requerimos el modulo passport
const passport = require("passport");

// Aca exportamos el metodo que nos proteje las rutas
// y le decimos que solo queremos el metodo isLoggedIn
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth")




// RUTAS

// REGISTRO
// Esta ruta es para renderizar el formulario
router.get("/signup", isNotLoggedIn, (req, res) => {
    res.render("./auth/signup");
});

// Esta ruta es para recibir los datos del formulario y hacer la auntenticacion del usuario con passport y el metodo local.signup que hemos creado en el archivo passport.js
router.post("/signup", isNotLoggedIn, passport.authenticate("local.signup", {
    // Aca vamos a especificar que va a pasar cuando todo este bien o cuando todo este mal
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true // Aca le decimos que queremos que nos muestre los mensajes de error en la pantalla
}));

// Esta ruta es para recibir los datos del formulario
// router.post("/signup", (req, res) => {
//     res.send("recibido",)
//     console.log(req.body)

//     // Aca llamamos a el modulo que hemos creado para hcer la utenticacion para que asi entienda que debe hacer
//     // cuando lo estamos llamando
//     passport.authenticate("local.signup", {
//         // Aca vamos a especificar que va a pasar cuando todo este bien o cuando todo este mal
//         successRedirect: "/profile",
//         failureRedirect: "/signup",
//         failureFlash: true
//     });
// });


// Esta ruta es para recibir los datos del formulario
// Esta es otra forma de hacer la utenticacion y esto hacer que le pasemos los datos
// directamente al enrutador





// LOGUIN
// Esta ruta es para renderizar el formulario
router.get("/loguin", isNotLoggedIn, (req, res) => {
    res.render("./auth/loguin");
});

router.post("/loguin", isNotLoggedIn, (req, res, next) => {
    passport.authenticate("local.loguin", {
        // Aca vamos a especificar que va a pasar cuando todo este bien o cuando todo este mal
        successRedirect: "/profile",
        // successRedirect: "/links",
        failureRedirect: "/loguin",
        failureFlash: true
    })(req, res, next);
});




// PERFIL
// Aca estamos protegiendo nuestra ruta profile diciendo que se ejecute primero
// la logica del isLoggedIn y luego el resto del codigo
router.get("/profile", isLoggedIn, (req, res) => {
    // res.send("Aca va el perfin del usuario")
    res.render("./profile")
});









// CERRAR SESION
router.get("/logout", isLoggedIn, (req, res) => {
    // Aca llamamos un metodo de passport para que nos cierre las sesion
    req.logOut((err) => {
        if (err) { return next(err); }
        res.redirect("/loguin");
    });
});


// app.post('/logout',(req, res, next) => {
//     req.logOut((err) => {
//         if (err) { return next(err); }
//         res.redirect('/');
//     });
// });


















// Exportamos el objeto que nos da el metodo Router
module.exports = router;