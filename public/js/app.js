const NombrePais = document.getElementById("nombre-pais-input");
const CodigoIsoPais = document.getElementById("ISO-pais-input");

const datosPais = {
  nombre: NombrePais.value,
  codigoIso: CodigoIsoPais.value
};

module.exports = datosPais;
