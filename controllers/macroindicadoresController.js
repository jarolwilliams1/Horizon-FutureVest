const macroModel = require("../models/macroindicadores.models");

async function ListaMacro(req, res) {
  const macroindicadores = await macroModel.obtenerTodos();
  const sumaPesos = macroindicadores.reduce((acc, m) => acc + parseFloat(m.peso || 0), 0);
  const sumaCompleta = Math.round(sumaPesos * 1000) / 1000 >= 1;
  res.render("macroindicadores", { macroindicadores, sumaCompleta });
}

async function VistaAgregarMacro(req, res) {
  res.render("agregarmacroindicador");
}

async function CrearMacro(req, res) {
  const { nombre, peso, esMejorMasAlto } = req.body;
  const errores = [];

  if (!nombre || nombre.trim() === "") errores.push("El nombre es obligatorio.");
  const pesoNum = parseFloat(peso);
  if (isNaN(pesoNum) || pesoNum < 0) errores.push("El peso debe ser un valor decimal válido.");

  if (errores.length === 0) {
    const sumaActual = await macroModel.sumaPesos(null);
    if (Math.round((sumaActual + pesoNum) * 1000) / 1000 > 1) {
      errores.push(`La suma de pesos no puede superar 1. Suma actual: ${sumaActual.toFixed(3)}`);
    }
  }

  if (errores.length > 0) {
    return res.render("agregarmacroindicador", { errores, datos: req.body });
  }

  await macroModel.crear({ nombre, peso, esMejorMasAlto });
  res.redirect("/macroindicadores");
}

async function VistaEditarMacro(req, res) {
  const macro = await macroModel.obtenerPorId(req.params.id);
  if (!macro) return res.redirect("/macroindicadores");
  res.render("editarmacroindicador", { macro });
}

async function EditarMacro(req, res) {
  const { nombre, peso, esMejorMasAlto } = req.body;
  const errores = [];

  if (!nombre || nombre.trim() === "") errores.push("El nombre es obligatorio.");
  const pesoNum = parseFloat(peso);
  if (isNaN(pesoNum) || pesoNum < 0) errores.push("El peso debe ser un valor decimal válido.");

  if (errores.length === 0) {
    const sumaActual = await macroModel.sumaPesos(req.params.id);
    if (Math.round((sumaActual + pesoNum) * 1000) / 1000 > 1) {
      errores.push(`La suma de pesos no puede superar 1. Suma actual (sin este): ${sumaActual.toFixed(3)}`);
    }
  }

  if (errores.length > 0) {
    const macro = await macroModel.obtenerPorId(req.params.id);
    return res.render("editarmacroindicador", { errores, macro: { ...macro, ...req.body } });
  }

  await macroModel.actualizar(req.params.id, { nombre, peso, esMejorMasAlto });
  res.redirect("/macroindicadores");
}

async function VistaEliminarMacro(req, res) {
  const macro = await macroModel.obtenerPorId(req.params.id);
  if (!macro) return res.redirect("/macroindicadores");
  res.render("eliminarmacroindicador", { macro });
}

async function EliminarMacro(req, res) {
  await macroModel.eliminar(req.params.id);
  res.redirect("/macroindicadores");
}

module.exports = {
  ListaMacro, VistaAgregarMacro, CrearMacro,
  VistaEditarMacro, EditarMacro,
  VistaEliminarMacro, EliminarMacro
};
