const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

/**
 * api/events
 **/

const router = Router();

router.use(validarJWT);

// todas las rutas de eventos deben pasar por validacion de JWT

//obtener eventos
router.get("/", getEventos);

//crear evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

//actualizar evento
router.put("/:id", actualizarEvento);

//borrar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
