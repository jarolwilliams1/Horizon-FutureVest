const express = require("express");
const router = express.Router();
const macroController = require("../controllers/macroindicadoresController");

router.get("/", macroController.ListaMacro);
router.get("/crear", macroController.VistaAgregarMacro);
router.post("/crear", macroController.CrearMacro);
router.get("/editar/:id", macroController.VistaEditarMacro);
router.post("/editar/:id", macroController.EditarMacro);
router.get("/eliminar/:id", macroController.VistaEliminarMacro);
router.post("/eliminar/:id", macroController.EliminarMacro);

module.exports = router;
