

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

  

}

module.exports = {crear};