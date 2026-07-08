const NombrePais = document.getElementById("nombre-pais-input");
const CodigoIsoPais = document.getElementById("ISO-pais-input");
const respuesta = require("../services/AgregarPaisService");

const datosPais = {
  nombre: NombrePais.value,
  codigoIso: CodigoIsoPais.value
};
const alerta = respuesta.mensaje;

alert(alerta)
module.exports = datosPais;
