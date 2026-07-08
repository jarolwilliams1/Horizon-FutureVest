const express = require("express");
const router = express.Router();

// Página principal de países
router.get("/", (req, res) => {
  res.render("paises", { titulo: "Lista de Países" });
});

// Subruta: /paises/agregarpais
router.get("/agregarpais", (req, res) => {
  res.render("agregarpais", { resultado: null });
});

// Subruta POST para procesar el formulario
router.post("/agregarpais", (req, res) => {
  const { nombre } = req.body;
  res.render("agregarpais", { resultado: `País agregado: ${nombre}` });
});

module.exports = router;
