const paisModel = require("../models/paises.models");

async function crear(datos) 
{
   
       
  if(!datos.nombre || datos.nombre.trim() === "" ) 
        {

                
  return { message: "El campo nombre es obligatorio" };
   
        }

    if(!datos.nombre || datos.nombre.trim() === ""  ) 

        {
                  return { message: "El campo Codigo iso es obligatorio" };

  }

const guardar =  await paisModel.GuardarPaises(datos)
return guardar;

}
//
module.exports = {crear};