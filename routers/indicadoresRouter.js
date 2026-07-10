const express = require("express");
const router = express.Router();
const indicadoresController = require("../controllers/indicadoresController");

router.get("/", indicadoresController.ListaIndicadores);
router.get("/crear", indicadoresController.VistaAgregarIndicador);
router.post("/crear", indicadoresController.CrearIndicador);
router.get("/editar/:id", indicadoresController.VistaEditarIndicador);
router.post("/editar/:id", indicadoresController.EditarIndicador);
router.get("/eliminar/:id", indicadoresController.VistaEliminarIndicador);
router.post("/eliminar/:id", indicadoresController.EliminarIndicador);

module.exports = router;
