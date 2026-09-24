import { Router } from 'express';
import servicesRoutes from './servicesRoutes';
import portfolioRoutes from './portfolioRoutes';
import blogsRoutes from './blogsRoutes';
import leadsRoutes from './leadsRoutes';
import seoRoutes from './seoRoutes';
import aiRoutes from './aiRoutes';
import testimonialsRoutes from './testimonialsRoutes';

const router = Router();

router.use('/services', servicesRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/blog', blogsRoutes);
router.use('/leads', leadsRoutes);
router.use('/seo', seoRoutes);
router.use('/ai', aiRoutes);
router.use('/testimonials', testimonialsRoutes);

export default router;
