// Aca vamos ha hasegurar las rutas de nuestra aplicacion

module.exports = {
    // Con esto hacemos la comprobacion de si el usuario esta logueado
    isLoggedIn(req, res, next) {
        // En caso de que usuario este logueado va a ejecutar este codigo
        if (req.isAuthenticated()) {
            return next();
        }
        // De lo contrario este
        return res.redirect("/loguin");
    },

    // Aca hacemos una validacion en caso de que el usuario ya este logueado
    // entonces le decimos que vistas puede o no puede ver
    isNotLoggedIn(req, res, next) {

        if(!req.isAuthenticated()) {
            return next();
        }
        return res.redirect("/profile");
    }
};