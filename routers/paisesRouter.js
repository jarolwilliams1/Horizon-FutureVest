const express = require("express");
const router = express.Router();
const paisesController = require("../controllers/paisesController")
// Página principal de países
router.get("/", paisesController.ListaPaises );

// Subruta: /paises/agregarpais
router.get("/agregarpais", paisesController.VistaAgregarPais);

// Subruta POST para procesar el formulario
router.post("/agregarpais", paisesController.crear);

module.exports = router;

