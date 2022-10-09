// Aca vamos almacenar todas las rutas principales de nuestra aplicacion

// Requerimos express para crear nuestras rutas
const express = require ("express");
// Aca importamos un metodo de express
const router = express.Router();



// RUTAS
router.get("/", (req, res) => {
    res.render("index");
});












// Exportamos el objeto que nos da el metodo Router
module.exports = router;