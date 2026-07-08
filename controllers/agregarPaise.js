
const agregarpaisservice = require("../services/AgregarPaisService")
async function crear(req,res){

    const datos = req.body;

    const resultado = await agregarpaisservice.crear(datos);
    

    res.json(resultado);

}

// Subruta: /paises/agregarpais
function Vista (req, res) {
  res.render("agregarpais", { resultado: null });
  };

  module.exports ={
    crear,
    Vista,

  }