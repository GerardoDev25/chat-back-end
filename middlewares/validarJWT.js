import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {
  try {
    const token = req.header('token');

    if (!token) return res.status(401).json({ ok: false, msg: 'token no encontrado' });

    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.uid = payload.uid;

    next();

    //
  } catch (error) {
    console.error(error);
    res.status(401).json({ ok: false, msg: 'token no es valido' });
  }
};
