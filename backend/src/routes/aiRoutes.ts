import { Router } from 'express';
import * as aiController from '../controllers/aiController';

const router = Router();

router.post('/', aiController.processAiRequest);

export default router;
