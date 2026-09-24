import { Router } from 'express';
import * as testimonialsController from '../controllers/testimonialsController';

const router = Router();

router.get('/', testimonialsController.getTestimonials);
router.post('/', testimonialsController.createTestimonial);
router.put('/:id', testimonialsController.updateTestimonial);
router.delete('/:id', testimonialsController.deleteTestimonial);

export default router;
