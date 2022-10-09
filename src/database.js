// Hacemos el requerimiento del modulo de mysql
const mysql = require ("mysql");
// Aca requerimos un modulo y el metodo promisify
const { promisify } = require("util");
// Aca importamos el archivo keys y le decimos que queremos solo la propiedad database
const { database } = require("./keys");
// Para utilizar la conexion vamos a utilizar un puente mysql
const pool = mysql.createPool(database);


// Aca vamos a utiliar la conexion
pool.getConnection((err, conn) => {
    if (err) {
        // Aca le decimos que si al momento de conectarnos a la bd encuentra algun error de estos
        // nos de una respuesta por consola

        // En caso de que la conexion se haya perdido
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("LA CONEXION A LA BASE DE DATOS FUE CERRADA".bgRed);
        }
        // En caso de que la bd tiene muchas conexiones
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("LA BASE DE DATOS TIENE MUCHAS CONEXIONES".bgRed);
        }
        // En caso de que nuestra conexion haya sido rechasada por algun error
        if (err.conde === "ENCONNREFUSED") {
            console.error("CONEXION RECHAZADA".bgRed);
        }
    }
    // Aca le decimos que si no hay error entonces hay conexion
    // y si es el caso entonces que me mande un mensaje por consola
    if (conn) conn.release();
        console.log("CONEXION A LA BASE DE DATOS EXITOSA".bgGreen)
    return;
});

// Aca exportamos el metodo y le decimos que tambien requerimos el metodo pool
// pero no todo el modulo si no solo sus metodos que empiecen con query
pool.query = promisify(pool.query);
// Ahora cada que queramos hacer consultas tambien podemos hacer promesas



// Aca exportamos el modulo pool para poder utilizarlo
module.exports = pool;