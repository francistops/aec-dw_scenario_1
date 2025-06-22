import { Router } from 'express';
const router = Router();
import { heartbeat } from '../controllers/statusController.js';

router.get('/heartbeat', heartbeat)

export default router;