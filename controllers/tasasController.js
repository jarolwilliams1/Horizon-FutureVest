const tasasModel = require("../models/tasas.models");

async function VistaTasas(req, res) {
  const tasas = await tasasModel.obtener();
  res.render("tasas", { tasas });
}

async function GuardarTasas(req, res) {
  const { tasaMinima, tasaMaxima } = req.body;
  const errores = [];

  const min = parseFloat(tasaMinima);
  const max = parseFloat(tasaMaxima);

  if (tasaMinima === "" || isNaN(min)) errores.push("La tasa mínima es requerida.");
  if (tasaMaxima === "" || isNaN(max)) errores.push("La tasa máxima es requerida.");
  if (!isNaN(min) && !isNaN(max) && min >= max) errores.push("La tasa mínima debe ser menor que la tasa máxima.");

  if (errores.length > 0) {
    return res.render("tasas", { errores, tasas: { tasaMinima, tasaMaxima } });
  }

  await tasasModel.guardar({ tasaMinima: min, tasaMaxima: max });
  res.redirect("/tasas");
}

module.exports = { VistaTasas, GuardarTasas };
