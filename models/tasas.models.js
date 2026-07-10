const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../datos/tasas.json");

async function obtener() {
  try {
    const contenido = await fs.readFile(filePath, "utf8");
    return JSON.parse(contenido);
  } catch {
    return { tasaMinima: 2, tasaMaxima: 15 };
  }
}

async function guardar(datos) {
  await fs.writeFile(filePath, JSON.stringify(datos, null, 2));
}

module.exports = { obtener, guardar };
