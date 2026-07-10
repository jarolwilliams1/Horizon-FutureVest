const paisesModel = require("../models/paises.models");

async function ListaPaises(req, res) {
  const paises = await paisesModel.obtenerTodos();
  res.render("paises", { paises });
}

async function VistaAgregarPais(req, res) {
  res.render("agregarpais");
}

async function CrearPais(req, res) {
  const { nombre, iso } = req.body;
  const errores = [];

  if (!nombre || nombre.trim() === "") errores.push("El nombre del país es obligatorio.");
  if (!iso || iso.trim() === "") errores.push("El código ISO es obligatorio.");

  if (errores.length > 0) {
    return res.render("agregarpais", { errores, datos: req.body });
  }

  await paisesModel.crear({ nombre, iso });
  res.redirect("/paises");
}

async function VistaEditarPais(req, res) {
  const pais = await paisesModel.obtenerPorId(req.params.id);
  if (!pais) return res.redirect("/paises");
  res.render("editarpais", { pais });
}

async function EditarPais(req, res) {
  const { nombre, iso } = req.body;
  const errores = [];

  if (!nombre || nombre.trim() === "") errores.push("El nombre del país es obligatorio.");
  if (!iso || iso.trim() === "") errores.push("El código ISO es obligatorio.");

  if (errores.length > 0) {
    const pais = await paisesModel.obtenerPorId(req.params.id);
    return res.render("editarpais", { errores, pais: { ...pais, ...req.body } });
  }

  await paisesModel.actualizar(req.params.id, { nombre, iso });
  res.redirect("/paises");
}

async function VistaEliminarPais(req, res) {
  const pais = await paisesModel.obtenerPorId(req.params.id);
  if (!pais) return res.redirect("/paises");
  res.render("eliminarpais", { pais });
}

async function EliminarPais(req, res) {
  await paisesModel.eliminar(req.params.id);
  res.redirect("/paises");
}

module.exports = {
  ListaPaises, VistaAgregarPais, CrearPais,
  VistaEditarPais, EditarPais,
  VistaEliminarPais, EliminarPais
};
