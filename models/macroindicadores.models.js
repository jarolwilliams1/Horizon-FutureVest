const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../datos/macroindicadores.json");

async function leerMacro() {
  try {
    const contenido = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(contenido);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function guardarMacro(lista) {
  await fs.writeFile(filePath, JSON.stringify(lista, null, 2));
}

async function obtenerTodos() {
  return await leerMacro();
}

async function obtenerPorId(id) {
  const lista = await leerMacro();
  return lista.find(m => m.id === id) || null;
}

async function sumaPesos(excluirId) {
  const lista = await leerMacro();
  return lista
    .filter(m => m.id !== excluirId)
    .reduce((acc, m) => acc + parseFloat(m.peso || 0), 0);
}

async function crear(datos) {
  const lista = await leerMacro();
  const nuevo = {
    id: Date.now().toString(),
    nombre: datos.nombre.trim(),
    peso: parseFloat(datos.peso),
    esMejorMasAlto: datos.esMejorMasAlto === "true" || datos.esMejorMasAlto === true
  };
  lista.push(nuevo);
  await guardarMacro(lista);
  return nuevo;
}

async function actualizar(id, datos) {
  const lista = await leerMacro();
  const idx = lista.findIndex(m => m.id === id);
  if (idx === -1) return null;
  lista[idx].nombre = datos.nombre.trim();
  lista[idx].peso = parseFloat(datos.peso);
  lista[idx].esMejorMasAlto = datos.esMejorMasAlto === "true" || datos.esMejorMasAlto === true;
  await guardarMacro(lista);
  return lista[idx];
}

async function eliminar(id) {
  const lista = await leerMacro();
  const nuevos = lista.filter(m => m.id !== id);
  await guardarMacro(nuevos);
}

module.exports = { obtenerTodos, obtenerPorId, sumaPesos, crear, actualizar, eliminar };
