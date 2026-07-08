const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController")

//  Mostrar la página principal vacía
router.get("/", homeController.mostrar);

module.exports = router;