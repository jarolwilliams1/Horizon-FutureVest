const express = require("express");
const router = express.Router();
const tasasController = require("../controllers/tasasController");

router.get("/", tasasController.VistaTasas);
router.post("/guardar", tasasController.GuardarTasas);

module.exports = router;
