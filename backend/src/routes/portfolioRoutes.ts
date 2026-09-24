import { Router } from 'express';
import * as portfolioController from '../controllers/portfolioController';

const router = Router();

router.get('/', portfolioController.getPortfolio);
router.post('/', portfolioController.createPortfolio);
router.put('/:id', portfolioController.updatePortfolio);
router.delete('/:id', portfolioController.deletePortfolio);

export default router;
