import { Router } from 'express';
import { check } from 'express-validator';
import { login, nuevoUsuario, renewToken } from '../controllers/auth.js';
import { validarCampost } from '../middlewares/vaidar-campos.js';
import { validarJWT } from '../middlewares/validarJWT.js';

const router = Router();

router.post(
  '/new',
  [
    check('email', 'el email is obligatorio').isEmail(),
    check('nombre', 'el nombre is obligatorio').isString().notEmpty(),
    check('password', 'el password is obligatorio').notEmpty(),
    validarCampost,
  ],
  nuevoUsuario
);

router.post(
  '/',
  [
    check('email', 'el email is obligatorio').isEmail(),
    check('password', 'el password is obligatorio').notEmpty(),
    validarCampost,
  ],
  login
);

router.get('/renew', validarJWT, renewToken);

export default router;
