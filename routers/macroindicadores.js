const express = require("express");
const router = express.Router();
const macroindicadores = require("../controllers/macroindicadoresController")

router.get("/", macroindicadores.mostrar  );


module.exports = router;
