// Importamos el modulo timeago
// Luego importamos su metetodo format
const {format} = require("timeago.js");

// Aca creamos este opbjeto ya que este es qle que va hacer utilizado por la vista
const helpers = {};


// Aca creamos un metodo de nuestro objeto
// De este amanera cambiamos el formato de fecha y hora para que sea en dias u horas etc
helpers.timeago = (timestamp) => {
    // console.log(timestamp)
    return format(timestamp);
};


// Aca exportamos nuestro objeto
module.exports = helpers;