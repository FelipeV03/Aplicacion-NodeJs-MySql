
// Aca vamos a almacnar los enlaces de nuestra aplicacion

// Requerimos express para crear nuestras rutas
const express = require ("express");
// Aca importamos un metodo de express
const router = express.Router();

// Aca hacemos el requerimiento del archivo donde estamos haciendo la conexion a la bd
const pool = require("../database");

// Aca exportamos el metodo que nos proteje las rutas
// y le decimos que solo queremos el metodo isLoggedIn
const { isLoggedIn } = require("../lib/auth")

// RUTAS

// INSERTAR
router.get("/add", isLoggedIn, (req, res) => {
    // Aca le estamos diciendo que nos de una respuesta ccuando accedamos a este link
    // res.send("SIUUUUUUUUUUUUUUUUUU");
    res.render("links/add");
});

router.post("/add", isLoggedIn, async (req, res) => {
    // De esta forma podemos ver que datos nos esta enviando el formulario
    // console.log(req.body);

    // Aca le decimos que de el objeto que nos esta envienado solo queremos la
    // propiedad titulo, url y descripcion
    const { title, url ,description } = req.body;
    // Aca le decimos que guardamos los anteriores datos en un objeto
    const newLink = {
        title,
        url,
        description,
        // De esta forma hacemos que cada usuario tenga susu propios enlaces
        // y no se mesclenn unos con otros
        user_id: req.user.id
    };
    // Aca estamos msotrando los datos que tiene esto objeto en consola
    // console.log(newLink)

    // Aca vamos a guardar los datos que estamos recibindo en la bd
    // Aca utilizamos await ya que esta peticion que estamos haciendo es una peticion acincrona
    // lo que quiere decir es que esto va a tomar su tiempo
    // Pero para que el await funcione se nececita al inicio de la funcion una palabra calve llamada async
    await pool.query("INSERT INTO links set ?", [newLink]);

    // Aca vamos a requerir flash para poder mandar mensajes
    // primero le designamos un nombre y luego ole decignamos el texto que queremos
    req.flash("success", "El link se ha guardado correctamente :)");

    // Aca le estamos diciendo que nos de una respuesta ccuando accedamos a este link
    // res.send("Recibido");

    // Aca le estamos diciendo que nos redirija a otr ubicacion
    res.redirect("/links");
});


// LISTAR
router.get("/", isLoggedIn, async (req, res) => {
    // Aca guardamos la consulta en una constaante
    const links = await pool.query("SELECT * FROM links WHERE user_id = ?", [req.user.id]);

    // Aca le estamos diciendo que nos muestre los liks por consola
    // console.log(links);

    // Esta sera la respuesta uqe nos dara en el front
    // res.send("Listas iran aqui");
    // Aca le estamos dieciendo que nos renderise en una vista mas organizada los links
    res.render("links/list",  {links});
});


// ELIMINAR
router.get("/delete/:id", isLoggedIn, async (req, res) => {
    // Aca le decimos que si nos esta enviado el parametro del id nos lo muestre por consola y nos de una
    // respuesta
    // console.log(req.params.id);
    // res.send("Eliminado")

    // Aca le decimos que desde req params solo queremos el id
    const { id } = req.params;

    // Aca le decimos que elimine el link que coincida con el id que esta enviando el usuario
    await pool.query("DELETE FROM links WHERE id = ?", [id]);

    req.flash("success", "El link se ha eliminado correctamente :)");

    res.redirect("/links");
});


// EDITAR
router.get("/edit/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    // res.send("Editado")

    // Aca le estamos diciendo que nos traiga los links que necuentre por el id que le estamos pidiendo
    const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);

    res.render("links/edit", {link: links[0]});
    // console.log(links[0]);
});


router.post("/edit/:id", isLoggedIn, async (req, res) => {
    // Aca nos aseguramos de recibir el id
    const { id } = req.params;
    // Aca nos aseguramos de recibir el titulo la url y la descripcion
    const { title, url, description } = req.body;
    // Aca guardamos los datos recibidos en un objeto
    const newlink = {
        title,
        url,
        description
    };
    // con esto nos aseguramos que estamos recibiendo los datos
    // console.log(newlink);
    // res.send("Actualizado")
    // Aca generamos la consulta para hjjacer la actualizacion de los datos
    await pool.query("UPDATE links set ? WHERE id = ?", [newlink, id]);

    req.flash("success", "El link se ha editado correctamente :)");

    res.redirect("/links");
});






// Exportamos el objeto que nos da el metodo Router
module.exports = router;