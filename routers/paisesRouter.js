const express = require("express");
const router = express.Router();
const paisesController = require("../controllers/paisesController");

router.get("/", paisesController.ListaPaises);
router.get("/crear", paisesController.VistaAgregarPais);
router.post("/crear", paisesController.CrearPais);
router.get("/editar/:id", paisesController.VistaEditarPais);
router.post("/editar/:id", paisesController.EditarPais);
router.get("/eliminar/:id", paisesController.VistaEliminarPais);
router.post("/eliminar/:id", paisesController.EliminarPais);

module.exports = router;
