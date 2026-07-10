const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../datos/indicadores.json");

async function leerIndicadores() {
  try {
    const contenido = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(contenido);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function guardarIndicadores(lista) {
  await fs.writeFile(filePath, JSON.stringify(lista, null, 2));
}

async function obtenerTodos() {
  return await leerIndicadores();
}

async function obtenerPorId(id) {
  const lista = await leerIndicadores();
  return lista.find(i => i.id === id) || null;
}

async function existeDuplicado(paisId, macroId, anio, excluirId) {
  const lista = await leerIndicadores();
  return lista.some(i =>
    i.paisId === paisId &&
    i.macroId === macroId &&
    i.anio === parseInt(anio) &&
    i.id !== excluirId
  );
}

async function crear(datos) {
  const lista = await leerIndicadores();
  const nuevo = {
    id: Date.now().toString(),
    paisId: datos.paisId,
    macroId: datos.macroId,
    valor: parseFloat(datos.valor),
    anio: parseInt(datos.anio)
  };
  lista.push(nuevo);
  await guardarIndicadores(lista);
  return nuevo;
}

async function actualizar(id, datos) {
  const lista = await leerIndicadores();
  const idx = lista.findIndex(i => i.id === id);
  if (idx === -1) return null;
  lista[idx].valor = parseFloat(datos.valor);
  await guardarIndicadores(lista);
  return lista[idx];
}

async function eliminar(id) {
  const lista = await leerIndicadores();
  const nuevos = lista.filter(i => i.id !== id);
  await guardarIndicadores(nuevos);
}

module.exports = { obtenerTodos, obtenerPorId, existeDuplicado, crear, actualizar, eliminar };
