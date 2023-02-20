// Este archvo es el encargado de tener la direccion y la configuracion de la base de datos
module.exports = {
    // Aca ponemos la informacion y las credenciales para hcer la conexion a la bd
    database: {
        host: "localhost",
        user: "root",
        password: "",
        port: "3306",
        database: "application_nodejs",
    }
};
// module.exports = {
//     // Aca ponemos la informacion y las credenciales para hcer la conexion a la bd
//     database:{
//         host: DB_HOST ,
//         user: DB_USER,
//         password: DB_PASSWORD,
//         port: DB_PORT,
//         database: DB_NAME
//     }
// };

// import {
//     DB_HOST,
//     DB_NAME,
//     DB_PASSWORD,
//     DB_PORT,
//     DB_USER
// }from "./config"