const indicadoresModel = require("../models/indicadores.models");
const paisesModel = require("../models/paises.models");
const macroModel = require("../models/macroindicadores.models");

async function ListaIndicadores(req, res) {
  const todos = await indicadoresModel.obtenerTodos();
  const paises = await paisesModel.obtenerTodos();
  const macros = await macroModel.obtenerTodos();

  const { filtroPais, filtroAnio } = req.query;

  let lista = todos.map(i => {
    const pais = paises.find(p => p.id === i.paisId);
    const macro = macros.find(m => m.id === i.macroId);
    return { ...i, nombrePais: pais ? pais.nombre : "—", nombreMacro: macro ? macro.nombre : "—" };
  });

  if (filtroPais) lista = lista.filter(i => i.paisId === filtroPais);
  if (filtroAnio) lista = lista.filter(i => i.anio === parseInt(filtroAnio));

  res.render("indicadores", { indicadores: lista, paises, filtroPais: filtroPais || "", filtroAnio: filtroAnio || "" });
}

async function VistaAgregarIndicador(req, res) {
  const paises = await paisesModel.obtenerTodos();
  const macros = await macroModel.obtenerTodos();
  res.render("agregarindicador", { paises, macros });
}

async function CrearIndicador(req, res) {
  const { paisId, macroId, valor, anio } = req.body;
  const errores = [];

  if (!paisId) errores.push("El país es obligatorio.");
  if (!macroId) errores.push("El macroindicador es obligatorio.");
  const valorNum = parseFloat(valor);
  if (valor === "" || valor === undefined || isNaN(valorNum)) errores.push("El valor debe ser un número decimal válido.");
  const anioNum = parseInt(anio);
  if (!anio || isNaN(anioNum) || !Number.isInteger(anioNum)) errores.push("El año debe ser un número entero válido.");

  if (errores.length === 0) {
    const duplicado = await indicadoresModel.existeDuplicado(paisId, macroId, anio, null);
    if (duplicado) errores.push("Ya existe un indicador para ese país, macroindicador y año.");
  }

  if (errores.length > 0) {
    const paises = await paisesModel.obtenerTodos();
    const macros = await macroModel.obtenerTodos();
    return res.render("agregarindicador", { errores, datos: req.body, paises, macros });
  }

  await indicadoresModel.crear({ paisId, macroId, valor, anio });
  res.redirect("/indicadores");
}

async function VistaEditarIndicador(req, res) {
  const indicador = await indicadoresModel.obtenerPorId(req.params.id);
  if (!indicador) return res.redirect("/indicadores");
  const paises = await paisesModel.obtenerTodos();
  const macros = await macroModel.obtenerTodos();
  const pais = paises.find(p => p.id === indicador.paisId);
  const macro = macros.find(m => m.id === indicador.macroId);
  res.render("editarindicador", { indicador, nombrePais: pais ? pais.nombre : "—", nombreMacro: macro ? macro.nombre : "—" });
}

async function EditarIndicador(req, res) {
  const { valor } = req.body;
  const errores = [];

  const valorNum = parseFloat(valor);
  if (valor === "" || valor === undefined || isNaN(valorNum)) errores.push("El valor debe ser un número decimal válido.");

  if (errores.length > 0) {
    const indicador = await indicadoresModel.obtenerPorId(req.params.id);
    const paises = await paisesModel.obtenerTodos();
    const macros = await macroModel.obtenerTodos();
    const pais = paises.find(p => p.id === indicador.paisId);
    const macro = macros.find(m => m.id === indicador.macroId);
    return res.render("editarindicador", { errores, indicador: { ...indicador, valor }, nombrePais: pais ? pais.nombre : "—", nombreMacro: macro ? macro.nombre : "—" });
  }

  await indicadoresModel.actualizar(req.params.id, { valor });
  res.redirect("/indicadores");
}

async function VistaEliminarIndicador(req, res) {
  const indicador = await indicadoresModel.obtenerPorId(req.params.id);
  if (!indicador) return res.redirect("/indicadores");
  const paises = await paisesModel.obtenerTodos();
  const macros = await macroModel.obtenerTodos();
  const pais = paises.find(p => p.id === indicador.paisId);
  const macro = macros.find(m => m.id === indicador.macroId);
  res.render("eliminarindicador", { indicador, nombrePais: pais ? pais.nombre : "—", nombreMacro: macro ? macro.nombre : "—" });
}

async function EliminarIndicador(req, res) {
  await indicadoresModel.eliminar(req.params.id);
  res.redirect("/indicadores");
}

module.exports = {
  ListaIndicadores, VistaAgregarIndicador, CrearIndicador,
  VistaEditarIndicador, EditarIndicador,
  VistaEliminarIndicador, EliminarIndicador
};
