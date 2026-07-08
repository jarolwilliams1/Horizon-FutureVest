
// Página principal de países
function ListaPaises (req, res) {
  res.render("paises");
};

// Subruta: /paises/agregarpais
function VistaAgregarPais(req, res){
  res.render("agregarpais");
};

// Subruta POST para procesar el formulario
function AgregarPais (req, res) {
  const { nombre } = req.body;
  res.render("agregarpais", { resultado: `País agregado: ${nombre}` });
  
};


module.exports = {
    ListaPaises,
    VistaAgregarPais,
    AgregarPais

}
