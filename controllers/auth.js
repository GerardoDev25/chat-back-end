import { request, response } from 'express';
import bcrypt from 'bcryptjs';
import Usuario from '../models/usuarior.js';
import { generarJWT } from '../helpers/jwt.js';

export const nuevoUsuario = async (req = request, res = response) => {
  try {
    const {
      body: { email, password },
    } = req;

    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'el correo ya existe',
      });
    }

    const usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    const token = await generarJWT(usuario.id);

    res.json({ token, usuario });

    //
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'hable con el admin',
    });
  }
};

export const login = async (req = request, res = response) => {
  try {
    const {
      body: { email, password },
    } = req;

    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'usuario no esncontrado',
      });
    }

    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword)
      return res.status(400).json({
        ok: false,
        msg: 'password no es correcto',
      });

    const token = await generarJWT(usuarioDB.id);

    res.json({ token });

    //
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'hable con el admin',
    });
  }
};

export const renewToken = async (req = request, res = response) => {
  const uid = req.uid;

  const token = await generarJWT(uid);
  const usuario = await Usuario.findById(uid);

  res.json({ ok: true, msg: 'renew', token, usuario });
};
