const paisesModel = require("../models/paises.models");
const macroModel = require("../models/macroindicadores.models");
const indicadoresModel = require("../models/indicadores.models");
const tasasModel = require("../models/tasas.models");

async function mostrar(req, res) {
  const todosIndicadores = await indicadoresModel.obtenerTodos();
  const aniosSet = new Set(todosIndicadores.map(i => i.anio));
  const anios = Array.from(aniosSet).sort((a, b) => b - a);
  const anioSeleccionado = anios.length > 0 ? anios[0] : null;

  res.render("home", { anios, anioSeleccionado });
}

async function calcularRanking(req, res) {
  const { anio } = req.body;
  const anioNum = parseInt(anio);

  const todosIndicadores = await indicadoresModel.obtenerTodos();
  const aniosSet = new Set(todosIndicadores.map(i => i.anio));
  const anios = Array.from(aniosSet).sort((a, b) => b - a);

  const macroindicadores = await macroModel.obtenerTodos();
  const paises = await paisesModel.obtenerTodos();
  const tasas = await tasasModel.obtener();

  const tasaMin = (tasas.tasaMinima && tasas.tasaMinima > 0) ? tasas.tasaMinima : 2;
  const tasaMax = (tasas.tasaMaxima && tasas.tasaMaxima > 0) ? tasas.tasaMaxima : 15;

  // Validar suma de pesos
  const macrosActivos = macroindicadores.filter(m => parseFloat(m.peso) > 0);
  const sumaPesos = macroindicadores.reduce((acc, m) => acc + parseFloat(m.peso || 0), 0);
  const sumaRedondeada = Math.round(sumaPesos * 1000) / 1000;

  if (sumaRedondeada !== 1) {
    return res.render("home", {
      anios, anioSeleccionado: anioNum,
      errorPesos: true,
      mensajePesos: `La suma de los pesos de los macroindicadores debe ser igual a 1. Suma actual: ${sumaRedondeada.toFixed(3)}`
    });
  }

  // Indicadores del año seleccionado
  const indicadoresAnio = todosIndicadores.filter(i => i.anio === anioNum);

  // Determinar países elegibles
  const paisesElegibles = paises.filter(pais => {
    return macrosActivos.every(macro => {
      return indicadoresAnio.some(i => i.paisId === pais.id && i.macroId === macro.id);
    });
  });

  if (paisesElegibles.length < 2) {
    const nombrePais = paisesElegibles.length === 1 ? paisesElegibles[0].nombre : null;
    return res.render("home", {
      anios, anioSeleccionado: anioNum,
      errorElegibles: true,
      mensajeElegibles: paisesElegibles.length === 1
        ? `Solo existe un país elegible: ${nombrePais}. Se necesitan al menos dos países para generar el ranking.`
        : `No hay países elegibles para el año ${anioNum}. Verifique que los países tengan indicadores para todos los macroindicadores requeridos.`
    });
  }

  // Calcular min/max por macroindicador entre países elegibles
  const minMax = {};
  macrosActivos.forEach(macro => {
    const valores = paisesElegibles.map(pais => {
      const ind = indicadoresAnio.find(i => i.paisId === pais.id && i.macroId === macro.id);
      return ind ? ind.valor : 0;
    });
    minMax[macro.id] = { min: Math.min(...valores), max: Math.max(...valores) };
  });

  // Calcular scoring por país
  const ranking = paisesElegibles.map(pais => {
    let scoring = 0;
    macrosActivos.forEach(macro => {
      const ind = indicadoresAnio.find(i => i.paisId === pais.id && i.macroId === macro.id);
      const valor = ind ? ind.valor : 0;
      const { min, max } = minMax[macro.id];

      let normalizado;
      if (min === max) {
        normalizado = 0.5;
      } else if (macro.esMejorMasAlto) {
        normalizado = (valor - min) / (max - min);
      } else {
        normalizado = (max - valor) / (max - min);
      }

      scoring += normalizado * parseFloat(macro.peso);
    });

    scoring = Math.min(1, Math.max(0, scoring));

    // Tasa de retorno: función lineal
    const tasaRetorno = tasaMin + scoring * (tasaMax - tasaMin);

    return {
      nombre: pais.nombre,
      iso: pais.iso,
      scoring: scoring.toFixed(4),
      tasaRetorno: tasaRetorno.toFixed(2)
    };
  });

  ranking.sort((a, b) => parseFloat(b.scoring) - parseFloat(a.scoring));

  res.render("home", { anios, anioSeleccionado: anioNum, ranking });
}

module.exports = { mostrar, calcularRanking };
