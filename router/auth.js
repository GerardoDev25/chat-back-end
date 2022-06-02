import { Router } from 'express';
import { login, nuevoUsuario, renewToken } from '../controllers/auth.js';

const router = Router();

router.post('/new', nuevoUsuario);

router.post('/', login);

router.get('/renew', renewToken);

export default router;
