const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.mostrar);
router.post("/ranking", homeController.calcularRanking);

module.exports = router;
