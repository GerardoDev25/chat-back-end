import { Router } from 'express';
import { obtenerChat } from '../controllers/mensajes.js';
import { validarJWT } from '../middlewares/validarJWT.js';

const router = Router();

router.get('/:de', validarJWT, obtenerChat);

export default router;
