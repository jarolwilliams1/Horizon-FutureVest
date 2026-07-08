const fs = require("fs").promises;
const path = require("path");

async function GuardarPaises(datos) {
  const filePath = path.join(__dirname, "datos.paises.json");

  try {
    // Leer archivo existente
    let contenido = await fs.readFile(filePath, "utf8");
    let paises = JSON.parse(contenido);

    // Agregar nuevo país
    paises.push(datos);

    // Guardar nuevamente
    await fs.writeFile(filePath, JSON.stringify(paises, null, 2));

    return { message: "País guardado correctamente" };
  } catch (err) {
    console.error(err);
    return { message: "Error al guardar el país" };
  }
}

    



module.exports ={
    GuardarPaises
}