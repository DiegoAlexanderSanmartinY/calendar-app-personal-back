const { response, request } = require("express");
const Evento = require("../models/Evento");
const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");
  try {
    res.status(201).json({
      ok: true,
      eventos,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;
    const eventoSave = await evento.save();
    res.status(201).json({
      ok: true,
      evento: eventoSave,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "event not found",
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "not authorized",
      });
    }
    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await Evento.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });
    res.status(201).json({
      ok: true,
      evento: eventUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "event not found",
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "not authorized",
      });
    }

    await Evento.findByIdAndDelete(eventId);

    res.status(201).json({
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};

// {ok: true,
// msg: "getEventos"}

// {
//     ok: true,
//     msg: "crearEvento"
// }

// {/123
//     ok: true,
//     msg: "actualizarEvento"
// }

// {/123
//     ok: true,
//     msg: "eliminarEvento"
// }
