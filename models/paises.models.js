const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../datos/paises.json");

async function leerPaises() {
  try {
    const contenido = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(contenido);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function guardarPaises(paises) {
  await fs.writeFile(filePath, JSON.stringify(paises, null, 2));
}

async function obtenerTodos() {
  return await leerPaises();
}

async function obtenerPorId(id) {
  const paises = await leerPaises();
  return paises.find(p => p.id === id) || null;
}

async function crear(datos) {
  const paises = await leerPaises();
  const nuevo = {
    id: Date.now().toString(),
    nombre: datos.nombre.trim(),
    iso: datos.iso.trim()
  };
  paises.push(nuevo);
  await guardarPaises(paises);
  return nuevo;
}

async function actualizar(id, datos) {
  const paises = await leerPaises();
  const idx = paises.findIndex(p => p.id === id);
  if (idx === -1) return null;
  paises[idx].nombre = datos.nombre.trim();
  paises[idx].iso = datos.iso.trim();
  await guardarPaises(paises);
  return paises[idx];
}

async function eliminar(id) {
  const paises = await leerPaises();
  const nuevos = paises.filter(p => p.id !== id);
  await guardarPaises(nuevos);
}

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
