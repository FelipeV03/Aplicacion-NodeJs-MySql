// Aca importamos bcryptjs que es el que nos va ayudar a encriptar las contraseñas
const bcrypt = require("bcryptjs")
// Aca va a ir los metodos que van a procesar determinados datos dentro de la aplicacion
const helpers = {};


// Aca vamos acrear un metodo de cifrado de contraseña
helpers.encryptPassword = async (password) => {
    // Aca creamos un hash el cual hace que nos encripte la contraseña
    // a mayor numero de ejecucion mejor cifrado pero tambien mas tardado es
    const salt = await bcrypt.genSalt(10);

    // Aca le decimos que le pasamos la password y salt para que nos genere un cifrado
    const hash = await bcrypt.hash(password, salt);
    // const hash = bcrypt.hashSync("B4c0/\/", salt);

    // Aca nos retorna la contraseña cifrada
    return hash;
};





// Aca vamos a crear el metodo de autentificacion
helpers.loguinPassword = async (password, savedPassword) => {
    // Aca hace la comparacion de la contraseña ya guardad y la que ingresmos en el campo
    // await bcript.compare(password, savedPassword);

    // Aca vamos a manejarlo dentro de un try catch
    try {
        // Aca estamos haciendo la autetificacion de la contraseña
        return await bcrypt.compare(password, savedPassword);
    }catch(e) {
        console.log(e);
    }

};












// Aca vamos aexportarlo para utilizarlo
module.exports = helpers;