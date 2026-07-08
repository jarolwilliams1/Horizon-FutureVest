const datosPais = require("../public/js/app.js");


const nombrePais = datosPais.Nombre;
const iso = datosPais.CodigoIso;

const mensaje ;
if (nombrePais == null )
    {
       mensaje= "los campos son requeridos";

}
module.exports = mensaje;
