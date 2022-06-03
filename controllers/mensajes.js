import Mensaje from '../models/mensaje.js';

export const obtenerChat = async (req, res) => {
  const miId = req.uid;
  const mensajeDe = req.params.de;

  const last30 = await Mensaje.find({
    $or: [
      { de: miId, para: mensajeDe },
      { de: mensajeDe, para: miId },
    ],
  }).sort({ createdAt: 'desc' });

  res.json({
    ok: true,
    mensaje: last30,
  });
};
