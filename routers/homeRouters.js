const express = require("express");
const router = express.Router();

//  Mostrar la página principal vacía
router.get("/", (req,res) =>{
    res.render("home", {resultado: null})
})

module.exports = router;