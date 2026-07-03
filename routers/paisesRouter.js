const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("paises", { titulo: "Lista de Países" });
});

module.exports = router;
