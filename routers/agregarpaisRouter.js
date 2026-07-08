const express = require("express");
const router = express.Router();
const agregarPaisController = require("../controllers/agregarPaise") 
const paisesController = require("../controllers/paisesController")

// Página principal de países
router.get("/", paisesController.ListaPaises );
// Subruta: /paises/agregarpais
router.get("/agregarpais", agregarPaisController.Vista);

// Subruta POST para procesar el formulario
router.post("/agregarpais", agregarPaisController.crear);

module.exports = router;
