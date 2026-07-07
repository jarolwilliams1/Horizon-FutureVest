const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();

// Configurar Handlebars como motor de vistas
app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "main", // Layout base en views/layouts/main.hbs
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middlewares esenciales para leer formularios (POST)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Cargar las rutas
const homeRouter = require("./routers/homeRouters");
app.use("/", homeRouter);

const paisesRouter = require("./routers/paisesRouter");
app.use("/paises", paisesRouter); // ruta correcta

///
const macroindicadoresRouter = require("./routers/macroindicadores");
app.use("/macroindicadores", macroindicadoresRouter); // ruta correcta

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
