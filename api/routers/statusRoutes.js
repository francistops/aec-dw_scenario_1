import { Router } from 'express';
const router = Router();
import { heartbeat } from '../controllers/statusController.js';


// router.get('/', statusController.statusPage);
router.get('/heartbeat', heartbeat)


export default router;