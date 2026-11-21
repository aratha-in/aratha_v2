import { Router } from 'express';
import * as blogsController from '../controllers/blogsController';

const router = Router();

router.get('/', blogsController.getBlogs);

export default router;
