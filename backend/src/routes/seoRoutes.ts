import { Router } from 'express';
import * as seoController from '../controllers/seoController';

const router = Router();

router.get('/', seoController.getSeo);
router.put('/', seoController.updateSeo);

export default router;
